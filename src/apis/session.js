import { host, ip } from "./api.js";
let base_url = "http://"+ip+host;
export const get_session_temp =  function(){

  return{
    session_id: "0",
    session_start_time: "2001/08/27",
    session_messages: [
        // {
        //   message_id: 0,
        //   message_sender: "user",
        //   message_time: "08:27",
        //   message_text: "哥们，你这瓜多少钱一斤啊？"
        // },{
        //   message_id: 1,
        //   message_sender: "robot",
        //   message_time: "08:28",
        //   message_text: "两块钱一斤"
        // },{
        //   message_id: 2,
        //   message_sender: "user",
        //   message_time: "08:29",
        //   message_text: "你这瓜皮子是金子做的还是瓜粒子是金子做的？你这瓜皮子是金子做的还是瓜粒子是金子做的？你这瓜皮子是金子做的还是瓜粒子是金子做的？你这瓜皮子是金子做的还是瓜粒子是金子做的？你这瓜皮子是金子做的还是瓜粒子是金子做的？你这瓜皮子是金子做的还是瓜粒子是金子做的？"
        // },{
        //   message_id: 3,
        //   message_sender: "robot",
        //   message_time: "08:30",
        //   message_text: "你瞧瞧现在哪有瓜呀，这都是大鹏的瓜，你嫌贵我还嫌贵呢。"
        // },{
        //   message_id: 4,
        //   message_sender: "user",
        //   message_time: "08:31",
        //   message_text: "你这瓜保熟吗？"
        // },{
        //   message_id: 5,
        //   message_sender: "robot",
        //   message_time: "08:32",
        //   message_text: "我开水果摊的，还能卖你生瓜蛋子啊？"
        // },{
        //   message_id: 6,
        //   message_sender: "user",
        //   message_time: "08:33",
        //   message_text: "我问你这瓜保熟吗？"
        // },{
        //   message_id: 7,
        //   message_sender: "robot",
        //   message_time: "08:34",
        //   message_text: "你是故意找茬是不是啊，你要不要吧！"
        // }
    ]
  };
}
