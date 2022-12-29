const express = require('express');
const app = express();
const ejs = require('ejs');
const { sequelize, Posts } = require('./database')


app.use(express.json())
app.use(express.urlencoded({extended: true}))


// DB 연결
sequelize.sync().then(function(){
  
  console.log('데이터 연결 완료')

})

// ejs를 view 엔진으로 설정
app.set('view engine', 'ejs');

// 정적파일 경로 지정
app.use(express.static("public"));

// home
app.get('/', async function(요청, 응답){
  
  const posts = await Posts.findAll({
    order:[["id", "DESC"]]
  });
  응답.render('pages/index.ejs', {posts});
  
})


// about
app.get('/about', function(req, res) {
  res.render('pages/about.ejs')
})

// 글쓰기 요청
app.post('/create', async function(req, res){
  // res.send('응답받음' + req.body.post )
  let post = req.body.name;
  let age = req.body.age;
  let sex = req.body.sex;
  let contact = req.body.phone;
  // 테이블명.create({칼럼이름: 값})
  const newPost = await Posts.create({name: post, age: age, sex: sex, contact: contact})
  // const newAge = await Posts.create({age: age})
  // const newSex = await Posts.create({sex: sex})
  
  
  res.redirect('/');
})


// 삭제 요청
app.post('/delete/:id', async function(req, res){
  await Posts.destroy({
    where: {
      id: req.params.id // 삭제할 글번호 위치
    }
    
  });
  res.redirect('/');
})

// 검색 요청
app.post('/serach', async function(req,res){
  let sch = await Posts.findOne({
    
    where: {
      name: req.body.serach
    }
  })
  const posts = await Posts.findAll({
    order:[["id", "DESC"]]
  });
  console.log(sch)
  res.render('pages/serach.ejs', {posts, sch})
})


const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`)
})