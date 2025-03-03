const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

const port = 8000;
app.use(bodyParser.json());

let conn = null;
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8830
    })
}

// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกไว้
app.get('/users', async (req, res) => {
    try {
        const results = await conn.query('SELECT * FROM users');
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});

// path = POST /users สำหรับสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const [results] = await conn.query('INSERT INTO users SET ?', user);
        res.json({
            message: 'Create user successfully',
            data: results
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});

// path = GET /users/:id สำหรับดึง users รายคนออกมา
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const [results] = await conn.query('SELECT * FROM users WHERE id = ?', id);
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});

// path = PUT /users/:id สำหรับแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', async (req, res) => {
        try{
        let id = req.params.id;
        let updateUser = req.body;
        const [results] = await conn.query(
            'UPDATE users SET ? WHERE id = ?', 
            [updateUser, id]
          )
          res.json({
              message: 'Update user successfully',
              data: results[0]
          });
      } catch (error) {
          console.error('Error creating user:', error.message);
          res.status(500).json({
              message: 'Something went wrong',
              errorMessage: error.message
          })
      }
})
        
// path = DELETE /users/:id สำหรับลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const [results] = await conn.query('DELETE FROM users WHERE id = ?', id);
        res.json({
             message: 'Delete user successfully',
             data: results[0]
          })
          }catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});

app.listen(port, async () => {
    await initMySQL();
    console.log('Http Server is running on port ' + port);
});