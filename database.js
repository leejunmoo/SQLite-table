// SQL ORM 모듈
const { Sequelize, DataTypes } = require('sequelize') ;

// DB 생성
const sequelize = new Sequelize({
    //옵션 설정
    dialect: 'sqlite', //db 종류
    storage: 'database.sqlite' // 저장방식(파일명)
})


// Model(테이블) 생성
const Posts = sequelize.define('Posts', {
    // create(속성 정의)
    name: {
        type:DataTypes.STRING, // 문자형
        allowNull: false, // NOT NULL (빈값허용X)
        defaultValue:'' // 오류 수정?....필수입력값인데 기본값이없어서 자꾸오류났었음
    },
    age: {
        type:DataTypes.INTEGER,
        allowNull: false,
        defaultValue:'' 
    },
    sex: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:''
    },
    contact: {
        type:DataTypes.STRING,
        defaultValue:''

    }

})

module.exports = { sequelize, Posts}