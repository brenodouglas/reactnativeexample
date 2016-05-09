import SQLite from 'react-native-sqlite-storage';
import moment from 'moment';

export default class ContasDAO {

    constructor()
    {
        this.db = SQLite.openDatabase("app-guard.db", "1.0", "BBomGuard", 200000,
          () => console.log("SQL executed fine"),
          (err) => console.log("SQL error "+err));

        this.db.transaction((tx) => {
            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS contas(
                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                   nome VARCHAR(255),
                   usuario VARCHAR(255),
                   hash VARCHAR(255),
                   token VARCHAR(6),
                   created_token DATETIME
               )
            `, [], () => console.log("Criado com sucesso"));
        });
    }

    getByHash(hash)
    {
      const promise = new Promise();

      this.db.transaction((tx) => {
          tx.executeSql("SELECT * FROM contas WHERE hash = ?",
            [hash],
            (tx, result) => this.extractResult(result, promise),
            (err) => promise.reject(err)
          );
      });

      return promise;
    }

    getById(id, callback)
    {
        this.db.transaction((tx) => {
            tx.executeSql("SELECT * FROM contas WHERE id = ?",
              [id],
              (tx, result) => callback(null, result.rows.item(0)),
              (err) => callback(err, null)
            );
        });
    }

    search(text)
    {
        this.db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM contas WHERE usuario LIKE '%${text}%'`,
              [],
              (tx, result) => this.extractResult(result, promise),
              (err) => promise.reject(err)
            );
        });

    }

    getList(callback)
    {
        this.db.transaction((tx) => {
            tx.executeSql("SELECT * FROM contas WHERE usuario <> '' OR usuario <> null ",
              [],
              (tx, result) => this.extractResult(result, callback),
              (err) =>  alert(JSON.stringify(err))
            );
        });
    }

    extractResult(results, callback)
    {
        var result = []
        for (let i = 0, len = results.rows.length; i < len; i++)
             result.push(results.rows.item(i));

        callback(result);
    }

    insert(objeto, callback)
    {
      this.db.transaction((tx) => {
        return this.db.executeSql(`INSERT INTO contas(nome, usuario, hash, token, created_token) VALUES(?, ?, ?, ?, ?)`,[
              '',
              objeto.customer,
              objeto.hash,
              objeto.token,
              moment().format('YYYY-MM-DD H:mm:ss')
          ],
          () => callback(null, {success: true}),
          (err) => callback(err, null)
        );
      });
    }

    refreshToken(id, token, callback)
    {
        alert(moment().format('YYYY-MM-DD H:mm:ss'));
        
        this.db.transaction((tx) => {
          return tx.executeSql("UPDATE contas SET token = ?, created_token = ? WHERE id = ?",
            [ token, moment().format('YYYY-MM-DD H:mm:ss'), id ],
            () => callback(null, {success: true}),
            (err) => callback(err, null)
          );
        });
    }
}
