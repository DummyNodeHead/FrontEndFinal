import {Table, Space,Layout, Menu, Descriptions,Card,Divider,Button} from 'antd';

import{DesktopOutlined,IdcardOutlined,EditOutlined,ReadOutlined,LeftOutlined,PlayCircleOutlined,BorderOutlined,OrderedListOutlined}from'@ant-design/icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { Tag,Image } from 'antd';
import axios from 'axios';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  HighlightOutlined,
  BookOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


  
  let datatestrank = [];





class introdu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    pid: this.props.location.state.pid,
    tid: this.props.location.state.username,
    current:'mail',
    ttdata:[{'exam_id':0}],
    examinfo:[{'exam_id':0}],
    columns : [
      {
        title: '学号',
        dataIndex: 'stid',
        key: 'age',
      },
      {
        title: '分数',
        dataIndex: 'score',
        key: 'address',
        defaultSortOrder: 'descend',
      }
    ],
    };
    axios
    .get('http://127.0.0.1:8000/exam/query/'+this.state.pid,
          { 
            headers:{'content-type':'application/x-www-form-urlencoded'},
  
          }
        ).then((res)=>{
          console.log(res.data);
          if(res.data.length!=0)
          this.setState({examinfo:res.data});
    })
    axios
    .get('http://127.0.0.1:8000/showanswerallstu/'+this.state.pid,
          { 
            headers:{'content-type':'application/x-www-form-urlencoded'},
  
          }
        ).then((res)=>{
          console.log(res.data);
          if(res.data.length>0)
          this.setState({ttdata:res.data});
          console.log(this.state.ttdata)
          datatestrank=[];
          datatestrank.length=0;
          for(let i=0;i<=res.data.length-1;i++){
            datatestrank.push({
              tid:i,
              stid:res.data[i]['student_id'],
              score:res.data[i]['score'],

            })
          }
    })
  }
  componentDidMount() {
    

    
    this.timer = setInterval(function () {
      this.setState({
        columns:this.state.columns,
      });
    }.bind(this), 100);
  
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };
  render() {
    const { current } = this.state;
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<LeftOutlined />}>
            <Link to={{pathname:"/TeacherCenter/testcenter_tea/testexam",state:{username:this.state.tid}}}>
              返回题目列表
            </Link>
          </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to={{pathname:"/TeacherCenter/testcenter_tea/testpaper1/testintroduce1/",state:{pid:this.state.pid,username:this.state.tid}}}>
              考试概况
            </Link>
          </Menu.Item>
            <Menu.Item key="3" icon={<EditOutlined />}>
            <Link to={{pathname:"/TeacherCenter/testcenter_tea/testpaper1/testquestions1/",state:{pid:this.state.pid,username:this.state.tid}}}>
              题目列表
              </Link>
          </Menu.Item>
            <Menu.Item key="4" icon={<OrderedListOutlined />}>
            <Link to={{pathname:"/TeacherCenter/testcenter_tea/testpaper1/testrank1/",state:{pid:this.state.pid,username:this.state.tid}}}>
              排名
              </Link>
          </Menu.Item>
          </Menu>
        </Sider>

        


        <Layout className="site-layout" style={{color:'white', marginLeft: 200 }}>
            
            <div style={{ color:'black', fontSize: '2em', marginLeft: 20 }}>试卷序号：{this.state.examinfo[0]['paper_id']}</div>
            
            <Divider />
            
            <Table style={{marginLeft: 20,marginRight:20 }} columns={this.state.columns} dataSource={datatestrank} />
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        
      </Layout >
    )
  }


}
introdu.contextTypes = {router:()=> React.PropTypes.func.isRequired };
export default introdu;
