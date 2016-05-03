import {SQLite} from 'react-native-sqlite-storage';
import {moment} from 'moment';

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

    getById(id)
    {
        const promise = new Promise();

        this.db.transaction((tx) => {
            tx.executeSql("SELECT * FROM contas WHERE id = ?",
              [id],
              (tx, result) => promise.resolve(results.rows.item(0)),
              (err) => promise.reject(err)
            );
        });

        return promise;
    }

    search(text)
    {
        const promise = new Promise();

        this.db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM contas WHERE usuario LIKE '%${text}%'`,
              [],
              (tx, result) => this.extractResult(result, promise),
              (err) => promise.reject(err)
            );
        });

        return promise
    }

    getList()
    {
        const promise = new Promise();

        this.db.transaction((tx) => {
            tx.executeSql("SELECT * FROM contas WHERE usuario <> '' OR usuario <> null ",
              [],
              (tx, result) => this.extractResult(result, promise),
              (err) => promise.reject(err)
            );
        });

        return promise;
    }

    extractResult(results, promise)
    {
        var result = []
        for (let i = 0, len = results.row.length; i < len; i++)
             result.push(results.rows.item(i));

        promise.resolve(result);
    }

    insert(objeto)
    {
      const promise = new Promise();

      this.db.transaction((tx) => {
        return this.db.executeSql(`INSERT INTO contas(nome, usuario, hash, token, created_token) VALUES(?, ?, ?, ?, ?)`,[
            objeto.nome,
            objeto.usuario,
            objeto.hash,
            objeto.token,
            moment().format('YYYY-MM-DD H:mm:ss')
        ],
        () => promise.resolve({success: true}),
        (err) => promise.reject(err));
      });

      return promise;
    }

    refreshToken(id, token)
    {
        const promise = new Promise();

        this.db.transaction((tx) => {
          return tx.executeSql("UPDATE contas SET token = ?, created_token = ? WHERE id = ?",
          [ token, moment().format('YYYY-MM-DD H:mm:ss'), id ],
          () => promise.resolve({success: true}),
          (err) => promise.reject(err
        });

        return promise;
    }
}