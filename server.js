import http from "http";
import fs from "fs";
import path from "path";
import { URL, fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1]
    ? process.argv[i + 1]
    : fallback;
}

const PORT = Number(arg("--port", process.env.PORT || 4000));
const DB_PATH = path.resolve(__dirname, arg("--db", "db.json"));

function loadDb() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function saveDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2) + "\n");
}

function send(res, status, body) {
  const json = JSON.stringify(body, null, 2);

  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  res.end(json);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      if (!data) return resolve({});

      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });

    req.on("error", reject);
  });
}

const sameId = (a, b) => String(a) === String(b);

const nextId = (collection) =>
  collection.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    return send(res, 204, {});
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const [resource, id] = url.pathname.split("/").filter(Boolean);

  if (!resource) {
    const db = loadDb();
    return send(res, 200, {
      resources: Object.keys(db),
    });
  }

  let db;

  try {
    db = loadDb();
  } catch (err) {
    return send(res, 500, {
      error: `Could not read ${DB_PATH}: ${err.message}`,
    });
  }

  if (!(resource in db)) {
    return send(res, 404, {
      error: `Unknown resource '${resource}'`,
    });
  }

  const data = db[resource];

  // Object resources (read only)
  if (!Array.isArray(data)) {
    if (req.method === "GET") {
      return send(res, 200, data);
    }

    return send(res, 405, {
      error: `'${resource}' is read-only`,
    });
  }

  try {
    if (!id) {
      if (req.method === "GET") {
        let items = data;

        for (const [key, value] of url.searchParams) {
          items = items.filter((item) => String(item[key]) === value);
        }

        return send(res, 200, items);
      }

      if (req.method === "POST") {
        const body = await readBody(req);

        const item = {
          id: nextId(data),
          ...body,
        };

        data.push(item);

        saveDb(db);

        return send(res, 201, item);
      }

      return send(res, 405, {
        error: `Method ${req.method} not allowed`,
      });
    }

    const index = data.findIndex((item) => sameId(item.id, id));

    if (index === -1) {
      return send(res, 404, {
        error: `${resource}/${id} not found`,
      });
    }

    if (req.method === "GET") {
      return send(res, 200, data[index]);
    }

    if (req.method === "PUT") {
      const body = await readBody(req);

      data[index] = {
        ...body,
        id: data[index].id,
      };

      saveDb(db);

      return send(res, 200, data[index]);
    }

    if (req.method === "PATCH") {
      const body = await readBody(req);

      data[index] = {
        ...data[index],
        ...body,
        id: data[index].id,
      };

      saveDb(db);

      return send(res, 200, data[index]);
    }

    if (req.method === "DELETE") {
      const [removed] = data.splice(index, 1);

      saveDb(db);

      return send(res, 200, removed);
    }

    return send(res, 405, {
      error: `Method ${req.method} not allowed`,
    });
  } catch (err) {
    return send(res, 400, {
      error: err.message,
    });
  }
});

server.listen(PORT, () => {
  const db = loadDb();

  console.log(`🚀 Mock API running at http://localhost:${PORT}`);

  console.log(`📄 Database: ${DB_PATH}`);

  console.log("\nAvailable Endpoints:");

  Object.keys(db).forEach((key) => {
    console.log(`http://localhost:${PORT}/${key}`);
  });
});