const mysql = require("mysql");
let instance = null;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Nodemysql connectd ......");
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async listIssueBypage(page) {
    try {
      const offset = (parseInt(page, 10) - 1) * 10;
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT * FROM issues ORDER BY id DESC LIMIT 10 OFFSET ?;";
        connection.query(query, [offset], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async listIssueById(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM issues WHERE id = ?;";
        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addIssue(name) {
    try {
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO issues (name, date_added, isOpen) VALUES (?,?,?);";

        connection.query(query, [name, dateAdded, 1], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      return {
        id: insertId,
        name: name,
        dateAdded: dateAdded,
        status: 1,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM issues WHERE id = ?";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateById(id, name, status) {
    try {
      id = parseInt(id, 10);
      const dateAdded = new Date();
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE issues SET name = ?, isOpen = ?, date_added = ?  WHERE id = ?";

        connection.query(
          query,
          [name, status, dateAdded, id],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
          }
        );
      });
      return {
        id: id,
        name: name,
        dateAdded: dateAdded,
        status: status,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = DbService;
