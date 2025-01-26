
import authServices from '../service/authService'

const apiTest = (req,res) => {
  return res.status(200).json({
    message:"Request successful",
    data:{
        "id":123,
        "name":"nhat",
        "email":"turu7432gmail.com"
    }

  })

}
const apiHandleRegister = async (req, res) => {
  const { username, email, password,phone } = req.body;

 try {
    if(!username || !email || !password || !phone){
      return res.status(200).json({
        EM:'Thiếu Thông tin bắt buộc',
        EC:'1',
        DT:''
      })
    }


    //service

    const data = await authServices.registerNewUser(req.body)

    
    if(data){
      return res.status(201).json({
      EM: data.EM,
      EC: data.EC, // Thành công
      DT: '', // Dữ liệu phản hồi
      });

    }else{
      return res.status(400).json({
        EM:data.EM,
        EC:'1',
        DT:''
      })
    }

  
 } catch (error) {
      console.error('Error during user registration:', error);

      return res.status(500).json({
      EM:'Máy chủ bị lỗi, vui lòng thử lại sau.',
      EC:'1',
      DT:''
      }) 
 }


};

module.exports ={
    apiTest,apiHandleRegister
}
