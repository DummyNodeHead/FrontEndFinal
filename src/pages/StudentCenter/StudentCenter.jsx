import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import StudentInfo from './StudentInfo'
import SApplication from './SApplication'
import MyApplication from './MyApplication'
import FindCourse from './FindCourse'
import ChangeStuInfo from './ChangeStuInfo'
import StuChangePSW from './StuChangePSW'

import AllCourse from './AllCourse'
import CourseResource from './CourseResource'
import Assignment from './Assignment'
import MyAssignment from './MyAssignment'
import Quiz from './Quiz'
import HWanalysis from './HWanalysis'
import PersonalResource from './PersonalResource'
import Grade from './Grade'

import ChooseCourse from './ChooseCourse'
import StudentCourseInfo from './StudentCourseInfo'
import Plan from './Plan'

import testintroduce from './testcenter_stu/testpaper/testintroduce'
import testquestions from './testcenter_stu/testpaper/testquestions'
import testrank from './testcenter_stu/testpaper/testrank'
import onlinetest from './testcenter_stu/onlinetest'

import {
  BarChartOutlined,
  CloudOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  HighlightOutlined,
  FileTextOutlined,
  BookOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;

class StudentCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      psw: "",
      type: ""
    };
  }

  componentWillMount() {

    var name = this.props.location.state.username;
    var passw = this.props.location.state.psw;
    var tp = this.props.location.state.type;
    this.setState({
      username: name,
      psw: passw,
      type: tp
    })
  }
  render() {
    console.log(this.state.psw);
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              ????????????
              <Link to={{ pathname: '/StudentCenter/StudentInfo', state: { username: this.state.username, psw: this.state.psw, type: this.state.type } }}></Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              ????????????
              <Link to={{ pathname: '/StudentCenter/AllCourse', state: { username: this.state.username, psw: this.state.psw, type: this.state.type } }}></Link>
            </Menu.Item>

            <SubMenu key="lesson" icon={<FileTextOutlined />} title="????????????">
              <Menu.Item key="l0">????????????
              <Link to="/StudentCenter/Plan"></Link>
              </Menu.Item>
              <Menu.Item key="l1">????????????
              <Link to="/StudentCenter/ChooseCourse"></Link>
              </Menu.Item>
			  <Menu.Item key="l2">????????????
              <Link to="/StudentCenter/StudentCourseInfo"></Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="3" icon={<UploadOutlined />}>
              ????????????
              <Link to={{ pathname: '/StudentCenter/ChooseCourse', props: { username: this.state.username, psw: this.state.psw, type: this.state.type } }}></Link>
            </Menu.Item>
      
            <Menu.Item key="4" icon={<HighlightOutlined />}>
              <Link to={{ pathname: '/StudentCenter/testcenter_stu', state: { username: this.state.username, psw: this.state.psw, type: this.state.type } }}>
                ????????????
            </Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<BarChartOutlined />}>
              ????????????
              <Link to={{ pathname: '/StudentCenter/Grade', state: { username: this.state.username, psw: this.state.psw, type: this.state.type } }}></Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<CloudOutlined />}>
              ????????????
              <Link to={{ pathname: '/StudentCenter/FindCourse', state: { username: this.state.username, psw: this.state.psw, type: this.state.type } }}></Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<SmileOutlined />}>
              ????????????
              <Link to={{ pathname: '/StudentCenter/PersonalResource', state: { username: this.state.username, psw: this.state.psw, type: this.state.type } }}></Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<SolutionOutlined />}>
              ????????????
              <Link to={{ pathname: '/StudentCenter/Plan', state: { username: this.state.username, psw: this.state.psw, type: this.state.type } }}></Link>
            </Menu.Item>

          </Menu>
        </Sider>


        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <span style={{ color: '#fff', fontSize: '1.4em', marginLeft: 20 }}>??????????????????--?????????</span>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
              <Switch>
                <Route path="/StudentCenter/StudentInfo" component={StudentInfo}></Route>
                <Route path="/StudentCenter/SApplication" component={SApplication}></Route>
                <Route path="/StudentCenter/MyApplication" component={MyApplication}></Route>
                <Route path="/StudentCenter/FindCourse" component={FindCourse}></Route>
                <Route path="/StudentCenter/StuChangePSW" component={StuChangePSW}></Route>
                <Route path="/StudentCenter/ChangeStuInfo" component={ChangeStuInfo}></Route>


                <Route path="/StudentCenter/AllCourse" component={AllCourse}></Route>
                <Route path="/StudentCenter/CourseResource" component={CourseResource}></Route>
                <Route path="/StudentCenter/Assignment" component={Assignment}></Route>
                <Route path="/StudentCenter/MyAssignment" component={MyAssignment}></Route>
                <Route path="/StudentCenter/Quiz" component={Quiz}></Route>
                <Route path="/StudentCenter/Grade" component={Grade}></Route>
                <Route path="/StudentCenter/PersonalResource" component={PersonalResource}></Route>
                <Route path="/StudentCenter/HWanalysis" component={HWanalysis}></Route>

                <Route path="/StudentCenter/ChooseCourse"  > <ChooseCourse username={this.state.username}/></Route>
                <Route path="/StudentCenter/StudentCourseInfo"><StudentCourseInfo username={this.state.username}/> </Route>
                <Route path="/StudentCenter/Plan" ><Plan username={this.state.username}/></Route>

                <Route exact path="/StudentCenter/testcenter_stu" component={onlinetest} />
                <Route exact path="/StudentCenter/testcenter_stu/testpaper" component={testintroduce} />
                <Route path="/StudentCenter/testcenter_stu/testpaper/testquestions" component={testquestions} />
                <Route path="/StudentCenter/testcenter_stu/testpaper/testintroduce" component={testintroduce} />
                <Route path="/StudentCenter/testcenter_stu/testpaper/testrank" component={testrank} />
                
      

                <Redirect to="/StudentCenter/StudentInfo"></Redirect>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ??2018 Created by Ant UED</Footer>
        </Layout>
      </Layout >
    )
  }


}
export default StudentCenter;
