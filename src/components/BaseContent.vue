<template>
  <div>
    <div class="container">
      <div class="left_bar">
        <div>
          <img
            src="../assets/images/avatar.jpg"
            width="36"
            height="36"
            style="margin-top:20px"
          />
        </div>
        <div
          :class="['bar_btn', activeBar === 1 ? 'activate_bar' : '']"
          @click="handleChangeBar(1)"
        >
          <v-icon name="comment"></v-icon>
        </div>
        <div
          :class="['bar_btn', activeBar === 2 ? 'activate_bar' : '']"
          @click="handleChangeBar(2)"
        >
          <v-icon name="user"></v-icon>
        </div>
        <!-- <div :class="['bar_btn',activeBar===3?'activate_bar':'']" @click="handleChangeBar(3)"><v-icon name="cube"></v-icon></div>
      <div :class="['bar_btn',activeBar===4?'activate_bar':'']" @click="handleChangeBar(4)"><v-icon name="folder"></v-icon></div>
      <div :class="['bar_btn',activeBar===5?'activate_bar':'']" @click="handleChangeBar(5)"><v-icon name="atom"></v-icon></div> -->
        <div class="last_btn">
          <div class="last_item"><v-icon name="mobile"></v-icon></div>
          <div class="last_item"><v-icon name="bars"></v-icon></div>
        </div>
      </div>
      <div class="user_list">
        <div style="height:60px;background:#EEEBE8;display:flex;">
          <div
            :style="
              'margin:20px 20px 20px 10px;width:190px;display:flex;border-radius: 5px;height:24px;background:' +
                (!focus ? '#DBD9D8' : '#fff')
            "
          >
            <v-icon
              name="search"
              style="height:24px;line-height:24px;margin-left:5px"
            ></v-icon>
            <input
              v-model.trim="search"
              :placeholder="focus ? '' : '搜索'"
              :style="
                'margin: 0 5px;width:140px;height:24px;border:0;' +
                  (!focus ? 'background:#DBD9D8' : '')
              "
              @focus="handleFocus"
            />
            <v-icon
              name="times"
              :style="
                'height:24px;line-height:24px;margin-right:5px;visibility:' +
                  (focus ? 'visible' : 'hidden')
              "
              @click="handleCancelFocus"
            ></v-icon>
          </div>
          <div class="close_btn" style="">
            <v-icon
              name="plus"
              style="height:20px;line-height:20px;margin: 2px auto;"
            ></v-icon>
          </div>
        </div>

        <div class="item_content">
          <vuescroll :ops="ops" v-if="activeBar === 1">
            <div
              v-for="item in history"
              :key="item.id"
              :class="['list_item', activeChat == item.id ? 'chat_active' : '']"
              @click="handleChangeChat(item)"
            >
              <div style="display:flex">
                <img
                  :src="item.avatar"
                  width="42"
                  height="42"
                  style="margin:10px 10px 10px 15px;"
                  alt=""
                />
                <div class="message">
                  <div style="margin-top:10px;">
                    <span>{{ item.name }}</span>
                    <div class="time">{{ item.time }}</div>
                  </div>
                  <span style="color:#999;font-size:12px">{{
                    item.message
                  }}</span>
                </div>
              </div>
            </div>
          </vuescroll>
          <vuescroll :ops="ops" v-else-if="activeBar === 2">
            <!--新的朋友-->
            <div
              style="margin-left:15px;font-size:12px;color:#A2A1A0;padding-top:20px;"
            >
              新的朋友
            </div>
            <div class="list_item" style="border-bottom:1px solid #D8D9D9">
              <div style="display:flex">
                <img width="42" height="42" style="margin:10px 10px 10px 15px;" alt="" />
                <div class="message">
                  <div style="margin-top:20px;font-size:14px">
                    <span>新的朋友</span>
                  </div>
                </div>
              </div>
            </div>
            <!--公众号-->
            <div
              style="margin-left:15px;font-size:12px;color:#A2A1A0;padding-top:20px;"
            >
              公众号
            </div>
            <div class="list_item" style="border-bottom:1px solid #D8D9D9">
              <div style="display:flex">
                <img width="42" height="42" style="margin:10px 10px 10px 15px;" alt="" />
                <div class="message">
                  <div style="margin-top:20px;font-size:14px">
                    <span>公众号</span>
                  </div>
                </div>
              </div>
            </div>
            <!--群聊-->
            <div
              style="margin-left:15px;font-size:12px;color:#A2A1A0;padding-top:20px;"
            >
              群聊
            </div>
            <div
              class="list_item"
              :style="i == 10 ? 'border-bottom:1px solid #D8D9D9' : ''"
              v-for="i in 10"
              :key="'b' + i"
              @contextmenu.prevent="handleShowMenu()"
            >
              <div style="display:flex">
                <img
                  url=""
                  width="42"
                  height="42"
                  style="margin:10px 10px 10px 15px;"
                  alt=""
                />
                <div class="message">
                  <div style="margin-top:20px;font-size:14px">
                    <span>群聊{{ i }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--好友-->
            <div v-for="item in zm" :key="item">
              <div
                style="margin-left:15px;font-size:12px;color:#A2A1A0;padding-top:20px;"
              >
                {{ item }}
              </div>
              <div
                class="list_item"
                :style="i == 5 ? 'border-bottom:1px solid #D8D9D9' : ''"
                v-for="i in 5"
                :key="'a' + i * 1000"
                @contextmenu.prevent="handleShowMenu()"
              >
                <div style="display:flex">
                  <img
                    url=""
                    width="42"
                    height="42"
                    style="margin:10px 10px 10px 15px;"
                    alt=""
                  />
                  <div class="message">
                    <div style="margin-top:20px;font-size:14px">
                      <span>{{ item }}--好友--{{ i }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </vuescroll>
        </div>
      </div>
      <!--右边-->
      <div class="chat_window" v-if="activeBar === 1">
        <div class="header">
          <div class="title">
            {{
              chat.name +
                (chat.type === 'group' ? '(' + chat.userCount + ')' : '')
            }}
          </div>
          <div
            style="width:30px;margin-top:20px;cursor: pointer;"
            v-if="chat.type != 'file'"
          >
            <v-icon name="ellipsis-h"></v-icon>
          </div>
        </div>
        <div class="content">
          <vuescroll :ops="ops">
            <div v-for="(item, i) in message" :key="i">
              <!-- <div class="message_time">昨天 22:55</div> -->
              <div
                class="message_left"
                v-if="item.isMe === 0"
                style="position: relative;margin:10px 0"
              >
                <img
                  :src="item.avatar"
                  width="32"
                  height="32"
                  style="position: absolute;left:30px;"
                />
                <div
                  style="color:#999;font-size:12px;margin-left:5px;position: absolute;left:70px"
                >
                  {{ item.nickName }}
                </div>
                <div
                  class="message_content"
                  v-if="item.type === 'text'"
                  v-html="item.message"
                ></div>
                <div class="message_content" v-else-if="item.type === 'image'">
                  <img
                    :src="item.message"
                    style="max-width:120px"
                    class="message_image"
                  />
                </div>
              </div>
              <div
                class="message_right"
                v-else
                style="position: relative;margin:10px 0"
              >
                <img
                  :src="item.avatar"
                  width="32"
                  height="32"
                  style="position: absolute;right:30px;"
                />
                <div
                  class="message_content"
                  v-if="item.type === 'text'"
                  v-html="item.message"
                ></div>
                <div class="message_content" v-else-if="item.type === 'image'">
                  <img
                    :src="item.message"
                    style="max-width:120px"
                    class="message_image"
                  />
                </div>
              </div>
            </div>
          </vuescroll>
        </div>
        <div class="edit">
          <div class="menu">
            <div class="menu_item"><v-icon name="smile"></v-icon></div>
            <div class="menu_item"><v-icon name="folder"></v-icon></div>
            <div class="menu_item"><v-icon name="cut"></v-icon></div>
            <div class="menu_item"><v-icon name="comment-dots"></v-icon></div>
            <div class="menu_last">
              <div class="last_item"><v-icon name="phone"></v-icon></div>
              <div class="last_item">
                <v-icon name="video" v-if="chat.type === 'friend'"></v-icon>
              </div>
            </div>
          </div>
          <div class="input_area">
            <textarea v-model.trim="msg"></textarea>
          </div>
          <div class="send">
            <button class="send_btn" @click="sendMessage">发送(S)</button>
          </div>
        </div>
      </div>
      <div class="chat_window" v-else-if="activeBar === 2"></div>
    </div>
    <div>
      <ul class="context_menu" id="menu" v-show="showMenu">
        <li>发消息</li>
        <li>修改备注</li>
        <li>删除</li>
      </ul>
    </div>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
export default {
  name: 'BaseContent',
  components: {
    vuescroll
  },
  data() {
    return {
      msg: '',
      search: '',
      focus: false,
      showMenu: false,
      chat: {},
      activeChat: null,
      activeBar: 1,
      ops: {
        vuescroll: {
          //mode:""
        },
        scrollPanel: {},
        rail: {
          size: '6px'
        },
        bar: {
          background: '#AEABAA',
          size: '6px'
        }
      },
      zm: [
        'A',
        'B',
        'C',
        'E',
        'F',
        'G',
        'M',
        'N',
        'O',
        'Q',
        'S',
        'T',
        'Y',
        'Z'
      ],
      message: [],
      messageList: [
        {
          nickName: '二狗',
          type: 'text',
          isMe: 0,
          fromId: 1,
          avatar:
            'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3772295863,2110288213&fm=26&gp=0.jpg',
          message: '@凡繁烦 你好帅'
        },
        {
          nickName: '三毛',
          type: 'text',
          isMe: 0,
          fromId: 2,
          avatar:
            'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2281399828,3874675610&fm=26&gp=0.jpg',
          message:
            "是挺帅的<a href='https://www.baidu.com' target='_blank'>https://www.baidu.com</a>"
        },
        {
          nickName: '凡繁烦',
          type: 'text',
          isMe: 1,
          fromId: 2,
          avatar:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580469165434&di=51933f9f688cf4d1375d4a6754dab8e1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F10%2F20180610095135_rfghp.jpg',
          message: '呵呵'
        },
        {
          nickName: '二狗',
          type: 'text',
          isMe: 0,
          fromId: 3,
          avatar:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580469165434&di=e4b9a1a12c2f63a532a6142a0c74a531&imgtype=0&src=http%3A%2F%2Fp1.qhimgs4.com%2Ft01f043e3f83dee0e93.jpg',
          message: '都吃晚饭了吗🙄🙄🙄'
        },
        {
          nickName: '凡繁烦',
          type: 'text',
          isMe: 1,
          fromId: 4,
          avatar:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580469165434&di=51933f9f688cf4d1375d4a6754dab8e1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F10%2F20180610095135_rfghp.jpg',
          message: '吃了'
        },
        {
          nickName: '三毛',
          type: 'text',
          isMe: 0,
          fromId: 2,
          avatar:
            'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2281399828,3874675610&fm=26&gp=0.jpg',
          message: '吃了'
        },
        {
          nickName: '大牛',
          type: 'text',
          isMe: 0,
          fromId: 5,
          avatar:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580469165434&di=51933f9f688cf4d1375d4a6754dab8e1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F10%2F20180610095135_rfghp.jpg',
          message: '吃了'
        },
        {
          nickName: '大牛',
          type: 'image',
          isMe: 0,
          fromId: 5,
          avatar:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580469165434&di=51933f9f688cf4d1375d4a6754dab8e1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F10%2F20180610095135_rfghp.jpg',
          message:
            'http://5b0988e595225.cdn.sohucs.com/images/20171108/77b9b72e37224117b883b8bdf2f088b7.gif'
        }
      ],
      history: [
        {
          id: 1,
          name: '相亲相爱一家人',
          type: 'group',
          time: '刚刚',
          avatar:
            'https://img2.woyaogexing.com/2020/01/25/b18fcbaf52974d0b90d3dbadb5aec4e2!400x400.jpeg',
          message: '三毛：吃了',
          userCount: 4
        },
        {
          id: 0,
          name: '文件传输助手',
          type: 'file',
          time: '刚刚',
          avatar:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580474114359&di=4ceb56c432fac14291fd5166ea020d4e&imgtype=0&src=http%3A%2F%2Fr.sinaimg.cn%2Flarge%2Farticle%2Fa26f4cee14bb0b95d05a2e0b20b26c19.png',
          message: '[图片]'
        },
        {
          id: 2,
          name: '三毛',
          type: 'friend',
          time: '14:05',
          avatar:
            'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2281399828,3874675610&fm=26&gp=0.jpg',
          message: '在吗？'
        },
        {
          id: 3,
          name: '马云',
          type: 'friend',
          time: '13:36',
          avatar:
            'https://img2.woyaogexing.com/2020/01/15/9ba685cf9fdd4332ab1f8bb3497b91cf!400x400.jpeg',
          message: '捐款了吗？'
        },
        {
          id: 4,
          name: '马化腾',
          type: 'friend',
          time: '13:08',
          avatar:
            'https://img2.woyaogexing.com/2020/01/28/c07479fd6f0e4d3ea4ce29c9ad89d800!400x400.jpeg',
          message: '上班了吗？'
        },
        {
          id: 8,
          name: '武汉加油群',
          type: 'group',
          time: '12:35',
          avatar:
            'https://img2.woyaogexing.com/2019/11/14/84fee70955f64e369d454a7ca87baaa6!400x400.jpeg',
          message: '老李：武汉加油',
          userCount: 40
        },
        {
          id: 9,
          name: '孝感加油群',
          type: 'group',
          time: '10:05',
          avatar:
            'https://img2.woyaogexing.com/2019/08/12/72994b8849e54dd9b37087019b476db2!400x400.jpeg',
          message: '孝感人民医院：孝感加油！！！',
          userCount: 30
        },
        {
          id: 10,
          name: '应城人民一家亲',
          type: 'group',
          time: '昨天',
          avatar:
            'https://img2.woyaogexing.com/2019/10/01/be54182ef2d445b2957a9b81b8d93564!400x400.jpeg',
          message: '应城市中心医院：紧急求援！！',
          userCount: 12
        },
        {
          id: 5,
          name: '陈坤',
          type: 'friend',
          time: '星期三',
          avatar:
            'https://img2.woyaogexing.com/2020/01/30/b73360617a824e6fb132099f55a3a09d!400x400.jpeg',
          message: '在吗？'
        },
        {
          id: 7,
          name: '呵呵',
          type: 'friend',
          time: '星期二',
          avatar:
            'https://img2.woyaogexing.com/2020/01/30/19cb2031ba544a8c99a8c1eaee1eb94d!400x400.jpeg',
          message: '湖北加油'
        },
        {
          id: 6,
          name: '二狗',
          type: 'friend',
          time: '20/01/28',
          avatar:
            'https://img2.woyaogexing.com/2019/10/14/525437822c8e4b1fb3ddc3d12fb9647a!400x400.jpeg',
          message: '中国加油'
        }
      ]
    };
  },
  created() {
    this.chat = this.history[0];
    this.activeChat = this.chat.id;
    this.message = this.messageList;
  },
  methods: {
    sendMessage() {
      let messageArr = this.message;
      let obj = {
        nickName: '凡繁烦',
        type: 'text',
        isMe: 1,
        avatar:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580469165434&di=51933f9f688cf4d1375d4a6754dab8e1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F10%2F20180610095135_rfghp.jpg',
        message: this.msg
      };
      messageArr.push(obj);
      this.msg = '';
    },
    handleChangeChat(obj) {
      this.chat = obj;
      if (obj.id === 1) {
        this.message = this.messageList;
      } else {
        this.message = [];
      }
      this.activeChat = obj.id;
      //调用消息获取接口
    },
    handleFocus() {
      this.focus = true;
    },
    handleCancelFocus() {
      this.search = '';
      this.focus = false;
    },
    handleChangeBar(val) {
      this.activeBar = val;
    },
    handleShowMenu:function(e) {
      var el = document.getElementById('menu');
      this.showMenu = true;
      this.$nextTick(()=>{
        var ev = e || event; //兼容性语句
        ev.preventDefault();
        var x = ev.clientX;
        var y = ev.clientY;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
      })
      
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  margin: 100px auto;
  border: 1px solid rgb(196, 194, 194);
  height: 700px;
  border-radius: 2px;
  width: 970px;
  box-shadow: 0 0 8px #aaa;
  .left_bar {
    position: relative;
    background: #25282b;
    width: 70px;
    text-align: center;
    .bar_btn {
      color: rgb(196, 194, 194);
      margin-top: 24px;
      cursor: pointer;
    }
    .activate_bar {
      color: #07c160;
    }
    .activate_bar:hover {
      color: #07c160 !important;
    }
    .last_btn {
      position: absolute;
      bottom: 20px;
      width: 100%;
      .last_item {
        color: rgb(196, 194, 194);
        margin-top: 24px;
        cursor: pointer;
      }
    }
    .bar_btn:hover,
    .last_item:hover {
      color: #fff;
    }
  }
  .user_list {
    background: #eeeae8;
    width: 300px;
    cursor: default;
    .close_btn {
      margin-top: 20px;
      width: 24px;
      height: 24px;
      margin-left: -8px;
      text-align: center;
      background: #dcd9d8;
      border-radius: 5px;
      cursor: pointer;
    }
    .item_content {
      overflow: hidden;
      height: calc(100% - 60px);
      .list_item {
        width: 100%;
        .message {
          flex: 1;
          .time {
            float: right;
            margin-right: 10px;
            color: #999;
            font-size: 12px;
          }
        }
      }
      .list_item:hover {
        background: rgba(153, 153, 153, 0.2);
      }
      .chat_active {
        background: rgba(153, 153, 153, 0.6);
      }
    }
  }
  .chat_window {
    width: 800px;
    background: #f5f5f5;
    .header {
      border-bottom: 1px solid #e7e7e7;
      height: 60px;
      display: flex;
      .title {
        font-size: 20px;
        height: 60px;
        line-height: 60px;
        margin-left: 20px;
        flex: 1;
      }
    }
    .content {
      height: calc(100% - 260px);
      position: relative;
      //左边
      .message_time {
        margin: 0 auto;
        background: #dadada;
        width: 60px;
        max-width: 180px;
        text-align: center;
        border-radius: 2px;
        color: #fff;
        font-size: 12px;
      }
      .message_left {
        .message_content {
          padding: 8px;
          margin-top: 20px;
          position: relative;
          display: inline-block;
          left: 75px;
          width: auto;
          max-width: 360px;
          min-height: 24px;
          background: #fff;
          -moz-border-radius: 12px;
          -webkit-border-radius: 12px;
          border-radius: 5px;
          word-break: break-all;
          .message_image {
            max-width: 120px;
            cursor: pointer;
          }
        }
        .message_content:before {
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          right: 100%;
          top: 8px;
          border-top: 3px solid transparent;
          border-right: 6px solid #fff;
          border-bottom: 3px solid transparent;
        }
      }
      //右边
      .message_right {
        .message_content {
          padding: 8px;
          margin-top: 20px;
          position: relative;
          display: inline-block;
          top: -20px;
          right: -530px;
          width: auto;
          max-width: 360px;
          min-height: 24px;
          background: #9eea6a;
          -moz-border-radius: 12px;
          -webkit-border-radius: 12px;
          border-radius: 5px;
          word-break: break-all;
          .message_image {
            max-width: 120px;
            cursor: pointer;
          }
        }
        .message_content:before {
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          left: 100%;
          top: 8px;
          border-top: 3px solid transparent;
          border-left: 6px solid #9eea6a;
          border-bottom: 3px solid transparent;
        }
      }
    }
    .edit {
      display: flex;
      flex-direction: column;
      height: 200px;
      background: #fff;
      .menu {
        height: 40px;
        padding-left: 15px;
        .menu_item {
          float: left;
          margin: 10px 8px;
          color: rgba(153, 153, 153, 0.6);
          cursor: pointer;
        }
        .menu_last {
          float: right;
          margin-right: 10px;
          .last_item {
            float: left;
            margin: 10px 8px;
            color: rgba(153, 153, 153, 0.6);
            cursor: pointer;
          }
        }
        .menu_item:hover,
        .last_item:hover {
          color: rgba(153, 153, 153, 1);
        }
      }

      .input_area {
        flex: 1;
        textarea {
          margin-left: 20px;
          height: 105px;
          width: calc(100% - 25px);
          resize: none;
          font-size: 20px;
        }
      }
      .send {
        height: 40px;
        .send_btn {
          outline: none;
          cursor: pointer;
          height: 24px;
          float: right;
          margin-right: 30px;
          line-height: 24px;
          border-width: 0;
          width: 70px;
          background-color: #f5f5f5;
          border-color: #999;
          text-align: center;
        }
        .send_btn:hover {
          background: green;
          color: #fff;
        }
      }
    }
  }
}
.context_menu{
  border:1px solid #999;
  width:100px;
  border-radius:5px;
  position: absolute;
  z-index: 99999;
  background: #fff;
  li {
    padding: 5px 20px;
    font-size: 14px;
  }
  li:hover{
    background: #dadada;
  }
}
</style>
