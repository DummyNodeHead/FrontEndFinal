import {InputNumber, Input,Radio,Form, Upload,message, Layout, Menu, Button, Modal, Table } from 'antd';
import { UnorderedListOutlined,CopyOutlined,LeftOutlined, InboxOutlined} from '@ant-design/icons';
import React from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router'
import { Image } from 'antd';
import { Card } from 'antd';
import 'antd/dist/antd.css';

const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;
const { Dragger } = Upload;

function callback(key) {
    console.log(key);
}




let datasourceonlinetestteacher=[];

class TeacherCenter extends React.Component {
  constructor(props){

    super(props);
    this.state={
      tid:this.props.location.state.username,
      columns : [
        {
          title: '题干',
          dataIndex: 'stem',
          width:'25%',
          onCell: ()=>{
            return  {
              style: {
                maxWidth: 200, wordBreak:'breakall' , whiteSpace: 'prewrap', wordWrap:'breakword'
              }
            }
          }, 
                 
        },
        {
          title: '题型',
          dataIndex: 'type',
          width:'5%',
          onCell: ()=>{
            return  {
              style: {
                maxWidth: 50, wordBreak:'breakall' , whiteSpace: 'prewrap', wordWrap:'breakword'
              }
            }
          }, 
                 
        },
        {
          title: 'A选项',
          dataIndex: 'optionA',
          width:'15%',
          onCell: ()=>{
            return  {
              style: {
                maxWidth: 100, wordBreak:'breakall' , whiteSpace: 'prewrap', wordWrap:'breakword'
              }
            }
          }, 
        },
        {
          title: 'B选项',
          dataIndex: 'optionB',
          width:'15%',
          onCell: ()=>{
            return  {
              style: {
                maxWidth: 100, wordBreak:'breakall' , whiteSpace: 'prewrap', wordWrap:'breakword'
              }
            }
          },  
        },
        {
          title: 'C选项',
          dataIndex: 'optionC',
          width:'15%',
          onCell: ()=>{
            return  {
              style: {
                maxWidth: 100, wordBreak:'breakall' , whiteSpace: 'prewrap', wordWrap:'breakword'
              }
            }
          },  
        },
        {
          title: 'D选项',
          dataIndex: 'optionD',
          width:'15%',
          onCell: ()=>{
            return  {
              style: {
                maxWidth: 100, wordBreak:'breakall' , whiteSpace: 'prewrap', wordWrap:'breakword'
              }
            }
          }, 
        },
        {
          title: '正确答案',
          dataIndex: 'correct_answer',
          width:'10%',
          onCell: ()=>{
            return  {
              style: {
                maxWidth: 60, wordBreak:'breakall' , whiteSpace: 'prewrap', wordWrap:'breakword'
              }
            }
          }, 
        },
        {
          title: '分数',
          dataIndex: 'value',
          width:'10%',
          onCell: ()=>{
            return  {
              style: {
                maxWidth: 60, wordBreak:'breakall' , whiteSpace: 'prewrap', wordWrap:'breakword'
              }
            }
          }, 
        }
      ],
    };
    let k=0;
  if(datasourceonlinetestteacher.length==0){

  datasourceonlinetestteacher=[];
  datasourceonlinetestteacher.length=0;
  axios
    .get('http://127.0.0.1:8000/show_choose_questionbyid/',
      { 
        headers:{'content-type':'application/x-www-form-urlencoded'},

      }
    ).then((res)=>{
      console.log(res.data);
      let res1=res.data;
      
      axios
      .get('http://127.0.0.1:8000/show_judge_questionbyid/',
        { 
          headers:{'content-type':'application/x-www-form-urlencoded'},

        }
      ).then((res)=>{
        console.log(res.data);
        
        datasourceonlinetestteacher=[];
        for(let i=0;i<res1.length;i++){
          datasourceonlinetestteacher.push({
            key:i,
            id:res1[i].choose_id,
            type:'选择',
            stem:res1[i].stem,
            optionA:res1[i]['optionA'],
            optionB:res1[i].optionB,
            optionC:res1[i].optionC,
            optionD:res1[i].optionD,
            correct_answer:res1[i].correct_answer,
            value:res1[i].value,
          })
          k=i;
        }



        for(let i=0;i<res.data.length;i++){
          datasourceonlinetestteacher.push({
            key:i+k+1,
            id:res.data[i].judge_id,
            type:'判断',
            stem:res.data[i].stem,
            optionA:'/',
            optionB:'/',
            optionC:'/',
            optionD:'/',
            correct_answer:res.data[i].correct_answer,
            value:res.data[i].value,
          })
        }

        
      })



      
    })

    }
  }
  state = {
    selectedRowKeys: [],
    tempselect:[],
    IsaddquestionVisible:false,
    IsaddquestionVisible2:false,
    IsGenerate: false,
    fileList: [],
    uploading: false,
    IsEditJudge: false,
    IsEditChoose: false,
    old_stem: null,
    old_val: 0,
    judge_old_answer: 1,
    choose_old_answer: 1,
    old_optionA: null,
    old_optionB: null,
    old_optionC:null,
    old_optionD: null,
    edit_id: 0
  };
  // todo: fill route
  search=(value)=>{
    let k=0;
    datasourceonlinetestteacher=[];
    axios
    .get('http://127.0.0.1:8000/search_judge/' + value,
       {
         headers:{'content-type':'application/x-www-form-urlencoded'},
       }
    ).then((res1)=>{
      axios
      .get('http://127.0.0.1:8000/search_choose/' + value, {headers:{'content-type':'application/x-www-form-urlencoded'},}
      ).then((res)=>{
        datasourceonlinetestteacher=[];
        for(let i=0;i<res1.data.length;i++){
          datasourceonlinetestteacher.push({
            key:i,
            id:res1.data[i].choose_id,
            type:'选择',
            stem:res1.data[i].stem,
            optionA:res1.data[i]['optionA'],
            optionB:res1.data[i].optionB,
            optionC:res1.data[i].optionC,
            optionD:res1.data[i].optionD,
            correct_answer:res1.data[i].correct_answer,
            value:res1.data[i].value,
          })
          k=i;
        }

        for(let i=0;i<res.data.length;i++){
          datasourceonlinetestteacher.push({
            key:i+k+1,
            id:res.data[i].judge_id,
            type:'判断',
            stem:res.data[i].stem,
            optionA:'/',
            optionB:'/',
            optionC:'/',
            optionD:'/',
            correct_answer:res.data[i].correct_answer,
            value:res.data[i].value,
          })
        }

      });


      

    });

  }
  componentDidMount() {
    

    
    this.timer = setInterval(function () {
      this.setState({
        columns:this.state.columns,
      });
    }.bind(this), 100);
  
  }
  undatechange=()=>{
    axios
    .get('http://127.0.0.1:8000/show_choose_questionbyid/',
      { 
        headers:{'content-type':'application/x-www-form-urlencoded'},

      }
    ).then((res)=>{
      console.log(res.data);
      for(let i=0;i<res.data.length-1;i++){
        datasourceonlinetestteacher.push({
          key:i,
          id:res.data[i].id,
          stem:res.data[i].stem,
          optionA:res.data[i]['optionA'],
          optionB:res.data[i].optionB,
          optionC:res.data[i].optionC,
          optionD:res.data[i].optionD,
          correct_answer:res.data[i].correct_answer
        })
      }
    })
  }
  showModal = () => {
    this.setState({IsaddquestionVisible:true});
  };
  showModal2 = () => {
    this.setState({IsaddquestionVisible2:true});
  };
  showModal3 = () => {
    this.setState({IsGenerate: true})
  }
  showModal4 = () => {
    this.setState({
      IsScaleAdd: true
    })
  };
  showEdit = (tempselect) => {
    console.log(tempselect);
    console.log(datasourceonlinetestteacher);
    if(tempselect){
    if ( tempselect.length == 1) {
      for(let j=0; j < datasourceonlinetestteacher.length; j++){
        if(tempselect[0] == datasourceonlinetestteacher[j].key){
          if (datasourceonlinetestteacher[j].type=='判断') {

             this.setState({
              old_stem: datasourceonlinetestteacher[j].stem,
              old_val: datasourceonlinetestteacher[j].value,
              old_answer: datasourceonlinetestteacher[j].correct_answer,
              edit_id: datasourceonlinetestteacher[j].id,
               IsEditJudge:true,
             })
            

          } else {
            this.setState({
              old_stem: datasourceonlinetestteacher[j].stem,
              old_val: datasourceonlinetestteacher[j].value,
              old_answer: datasourceonlinetestteacher[j].correct_answer,
              optionA: datasourceonlinetestteacher[j].optionA,
              optionB: datasourceonlinetestteacher[j].optionB,
              optionC: datasourceonlinetestteacher[j].optionC,
              optionD: datasourceonlinetestteacher[j].optionD,
              edit_id: datasourceonlinetestteacher[j].id,
              IsEditChoose: true
            })
          }
        }
      }
    } else if (!this.state.selectedRowKeys.length ){
      message.warning('请先选中一道题');
    } else if (this.state.selectedRowKeys.length > 1) {
      message.warning('编辑状态只允许选中一道题');
    }
  }else{
    message.warning('请先选中一道题');
  }
  }

  EditJudge=(values)=> {
    let url_params = this.state.edit_id+'/'+values['stem']+'/'+values['value']+'/'+values['correctans'];
    axios.get('http://127.0.0.1:8000/edit/judge/'+url_params, 
    {headers: {'content-type':'application/x-www-form-urlencoded'}}
    ).then((res)=>{
      console.log("777");
      this.setState({
        IsEditJudge: false,
      })
    })
    message.success('题目修改成功');
  }
  EditChoose=(values)=> {
    let url_params = this.state.edit_id+'/'+values['stem']+'/'+values['value']+'/'+values['selectA']+'/'+values['selectB']+'/'+values['selectC']+'/'+values['selectD']+'/'+values['correctans'];
    console.log(url_params);
    axios.get('http://127.0.0.1:8000/edit/choose/'+url_params, 
    {headers: {'content-type':'application/x-www-form-urlencoded'}}
    ).then((res)=>{
      console.log("888");
      this.setState({
        IsEditChoose: false,
      })
    })
    message.success('题目修改成功');
  }

  handleCancel=()=>{
    this.setState({IsaddquestionVisible:false});
  }
  handleCancel2=()=>{
    this.setState({IsaddquestionVisible2:false});
  };
  handleCancle3=()=>{
    this.setState({IsGenerate: false});
  };
  handleCancel4 = ()=> {
    this.setState({IsScaleAdd: false});
  };
  handleCancleEditJudge = () =>{
    this.setState({
      IsEditJudge: false
    })
  };
  handleCancleEditChoose = () => {
    this.setState({
      IsEditChoose: false
    })
  }
  handleok=()=>{
    this.setState({IsaddquestionVisible:false});
  };
  handleok2=()=>{
    this.setState({IsaddquestionVisible2:false});
  };
  handleGenerate=()=>{
    this.setState({IsGenerate: false});
  };
  handleFileChange = ({file, fileList}) => { //处理文件change，保证用户选择的文件只有一个
    this.setState({
        'fileList': fileList.length? [fileList[fileList.length - 1]] : []
    })
  }

  changetempselect=(tt)=>{
    console.log(1);
    this.setState({tempselect:tt})
  };
  selectRow = (record) => {
    const selectedRowKeys = [this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    this.setState({ selectedRowKeys });
  };
  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  addchooseques=(values)=>{
    this.handleok();
    this.state.tempadd='Max-cut problem: ';
    axios
    .get('http://127.0.0.1:8000/add_choose_question/97/'+values['courseid']+'/'+values['teacherid']+'/0/'+values['stem']+'/'+values['value']+'/'+values['selectA']+'/'+values['selectB']+'/'+values['selectC']+'/'+values['selectD']+'/'+values['correctans'],
      { 
        headers:{'content-type':'application/x-www-form-urlencoded'},

      }
    ).then((res)=>{
      console.log(res.data);
      
      this.setState(
        {
          tempst:res.data,
          count: this.state.count + 1
        },
      )
    })
  }

  deletechoose=(id)=>{
    axios
    .get('http://127.0.0.1:8000/delete_choose_question/'+id,
      { 
        headers:{'content-type':'application/x-www-form-urlencoded'},

      }
    ).then((res)=>{
      console.log(res.data)
      
    })
  }
  deletejudge=(id)=>{
    axios
    .get('http://127.0.0.1:8000/delete_judge_question/'+id,
      { 
        headers:{'content-type':'application/x-www-form-urlencoded'},

      }
    ).then((res)=>{
      console.log(res.data)
      
    })
  }
  deleteques=(tt)=>{
    console.log(1);
    console.log(tt);
    if(tt){

      console.log(2);
      for(let i=0;i<tt.length;i++){
        for(let j=0;j<datasourceonlinetestteacher.length;j++){
          if(tt[i]==datasourceonlinetestteacher[j].key){
            if(datasourceonlinetestteacher[j].type=='选择'){
              console.log(datasourceonlinetestteacher[j]);
              this.deletechoose(datasourceonlinetestteacher[j].id);
            }
            else{
              this.deletejudge(datasourceonlinetestteacher[j].id);
            }
          }
        }
      }
    }
    else{
      message.warning('请先选中一道题');
    }
    this.componentDidMount();
  }
  addjudgeques=(values)=>{
    this.handleok();
    this.state.tempadd='Max-cut problem: ';
    axios
    .get('http://127.0.0.1:8000/add_judge_question/97/'+values['courseid']+'/'+values['teacherid']+'/0/'+values['stem']+'/'+values['value']+'/'+values['correctans'],
      { 
        headers:{'content-type':'application/x-www-form-urlencoded'},
      }
    ).then((res)=>{
      console.log(res.data);
      
      this.setState(
        {
          tempst:res.data,
          count: this.state.count + 1
        },
      )
    })
  }
  addpaper=(values)=>{
    console.log(values);
    let summark=0;
    let id=0;
    if(this.state.tempselect)
    for(let i=0;i<this.state.tempselect.length;i++){
      for(let j=0;j<datasourceonlinetestteacher.length;j++){
        if(this.state.tempselect[i]==datasourceonlinetestteacher[j].key){
          summark=summark+datasourceonlinetestteacher[j].value;
        }
      }
    }

    axios
    .get('http://127.0.0.1:8000/add_test_paper/1/'+values['paper_name']+'/'+values['course_id']+'/2190100555/'+summark,
      { 
        headers:{'content-type':'application/x-www-form-urlencoded'},

      }
    ).then((res)=>{
      console.log(res.data);
      id=res.data[0]['max(paper_id)'];
      if(this.state.tempselect)
    for(let i=0;i<this.state.tempselect.length;i++){
      for(let j=0;j<datasourceonlinetestteacher.length;j++){
        if(this.state.tempselect[i]==datasourceonlinetestteacher[j].key){
          if(datasourceonlinetestteacher[j].type=='选择'){
            axios
            .get('http://127.0.0.1:8000/add_test_paper_choose_question/'+id+'/'+datasourceonlinetestteacher[j].id,
              { 
                headers:{'content-type':'application/x-www-form-urlencoded'},

              }
            ).then((res)=>{
              console.log(res.data);
            })
          }
          else{
            axios
            .get('http://127.0.0.1:8000/add_test_paper_judge_question/'+id+'/'+datasourceonlinetestteacher[j].id,
              { 
                headers:{'content-type':'application/x-www-form-urlencoded'},
              }
            ).then((res)=>{
              console.log(res.data);
            })
          }
        }
      }
    }
    })

    



  }
  generatePaperRandomly=(values)=>{
    let url_params = values['paper_name'] + '/' + values['course_id'] + '/' + values['teacher_id'] +
          '/' + values['choose_num'] + '/' + values['judge_num'];
    console.log(url_params);
    axios.get(
      'http://127.0.0.1:8000/generatePaper/' + url_params, 
      {
        headers:{'content-type':'application/x-www-form-urlencoded'},
      }
    ).then ((res)=>{
      this.setState({
        IsGenerate: false
      })
      if (res.data != 0) {
        message.success('试卷生成成功，编号为' + res.data);
      } else {
        message.warning('抱歉，当前题库内题目不足，请减少题量或增加试卷');
      }
    });
  }
  ScaleAdd_judge=()=>{
    var file = document.getElementById('upload_judge').files[0];
    var reader = new FileReader();
  //  reader.readAsArrayBuffer(file, 'utf-8');
    reader.readAsText(file, 'utf-8');
    reader.onload = (e)=>{
      console.log(e);
      console.log(reader.readyState);
      var result = reader.result;
      var j = 0;
      var record = new Array();;
      var line = [];
      var clear = [];
      var cnt_line = 0;
      for ( j = 0; result[j]; j++ ) {  
        if (result[j] == '\r') {
          if (result[++j] == '\n') {
            console.log(cnt_line + ":" + line);
            record.push(line);
            line = clear;
            cnt_line++;
          } else {
            line += result[j];
          }
        } else {
          line += result[j];
        }
        if ( cnt_line == 6 ) {
          axios.get('http://127.0.0.1:8000/scale_add_judge/'+record[0]+'/'+record[1]+'/'+record[2]+'/'+record[3]+'/'+record[4]+'/'+record[5],
          {
            headers:{'content-type':'application/x-www-form-urlencoded'},
          }).then((res)=>{
            console.log(res.data);
            this.setState({
                tempst:res.data,
            })
          })
          cnt_line = 0;
        }
      }
      message.success('文件读取成功');
    }
  }

  ScaleAdd_choose=()=>{
    var file = document.getElementById('upload_choose').files[0];
    var reader = new FileReader();
  //  reader.readAsArrayBuffer(file, 'utf-8');
    reader.readAsText(file, 'utf-8');
    reader.onload = (e)=>{
      console.log(e);
      console.log(reader.readyState);
      var result = reader.result;
      var j = 0;
      var record = new Array();;
      var line = [];
      var clear = [];
      var cnt_line = 0;
      for ( j = 0; result[j]; j++ ) {  
        if (result[j] == '\r') {
          if (result[++j] == '\n') {
            console.log(cnt_line + ":" + line);
            record.push(line);
            line = clear;
            cnt_line++;
          } else {
            line += result[j];
          }
        } else {
          line += result[j];
        }
        if ( cnt_line == 10 ) {
          axios.get('http://127.0.0.1:8000/scale_add_choose/'+record[0]+'/'+record[1]+'/'+record[2]+'/'+record[3]+'/'+record[4]+'/'+record[5]+'/'+record[6]+'/'+record[7]+'/'+record[8]+'/'+record[9],
          {
            headers:{'content-type':'application/x-www-form-urlencoded'},
          }).then((res)=>{
            console.log(res.data);
            this.setState({
                tempst:res.data,
            })
          })
          cnt_line = 0;
        }
      }
      message.success('文件读取成功');
    }
  }


  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
       selectedRowKeys,
       
        onChange: this.onSelectedRowKeysChange
    };
    return (



          
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          
            <div>
              
                    <div style={{margin:'0 0 15px 0'}}>
                        <Search onSearch={this.search} name="subject" enterButton style={{ margin: '0 30px 0 0', width: '30%'}}></Search>
                        <Button onClick={this.showModal2} type="primary"  style={{margin: '0 30px 0 0'}}>生成试卷</Button>
                        <Modal title="生成试卷" visible={this.state.IsaddquestionVisible2}  onOk={this.handleok2} onCancel={this.handleCancel2} footer={null}>

                        <Form
                          labelCol={{
                            span: 30,
                          }}
                          wrapperCol={{
                            span: 30,
                          }}
                          layout="horizontal"
                          onFinish={this.addpaper}
                        >
                          <Form.Item  rules={[{required: true,}]} label="试卷名" name="paper_name" disabled>
                          
                          <TextArea
                            placeholder="50字以内"
                            autoSize={{ minRows: 1, maxRows: 2 }}
                          />
                          </Form.Item>
                          <Form.Item label="">
                            <Button htmlType="submit" onClick={()=>{this.changetempselect(selectedRowKeys)}}>确定</Button>
                          </Form.Item>
                        </Form>
                        </Modal>

                        <Modal title="添加题目" visible={this.state.IsaddquestionVisible} onOk={this.handleok} onCancel={this.handleCancel} footer={null}>

                        <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="选择题" key="1" id="QB_view">
                        <Form
                          labelCol={{
                            span: 30,
                          }}
                          wrapperCol={{
                            span: 30,
                          }}
                          layout="horizontal"
                          onFinish={this.addchooseques}
                        >
                          <Form.Item rules={[{required: true,}]} label="题干" name="stem" disabled>
                          
                          <TextArea
                            placeholder="500字以内"
                            autoSize={{ minRows: 3, maxRows: 6 }}
                          />
                          </Form.Item>
                          <Form.Item label="选项A" name="selectA">
                          <TextArea
                            placeholder="200字以内"
                            autoSize={{ minRows: 2, maxRows: 4 }}
                          />
                          </Form.Item>
                          <Form.Item label="选项B" name="selectB">
                          <TextArea
                            placeholder="200字以内"
                            autoSize={{ minRows: 2, maxRows: 4 }}
                          />
                          </Form.Item>
                          <Form.Item label="选项C" name="selectC">
                          <TextArea
                            placeholder="200字以内"
                            autoSize={{ minRows: 2, maxRows: 4 }}
                          />
                          </Form.Item>
                          <Form.Item label="选项D" name="selectD">
                          <TextArea
                            placeholder="200字以内"
                            autoSize={{ minRows: 2, maxRows: 4 }}
                          />
                          </Form.Item>
                          <Form.Item rules={[{required: true,}]} label="分数" name="value">
                          <InputNumber min={0} max={10} defaultValue={0}/>
                          </Form.Item>
                          <Form.Item rules={[{required: true,}]} label="正确选项" name="correctans">
                            <Radio.Group onChange={this.handleanswer} value={this.state.answer} >
                              <Radio value="A">A</Radio>
                              <Radio value="B">B</Radio>
                              <Radio value="C">C</Radio>
                              <Radio value="D">D</Radio>
                            </Radio.Group>
                          </Form.Item>
                          <Form.Item label="">
                            <Button htmlType="submit" >确定</Button>
                          </Form.Item>
                        </Form>
                        </TabPane>

                        <TabPane tab="判断题" key="2" id="QB_w">
                        <Form
                          labelCol={{
                            span: 30,
                          }}
                          wrapperCol={{
                            span: 30,
                          }}
                          layout="horizontal"
                          onFinish={this.addjudgeques}
                        >
                          <Form.Item rules={[{required: true,}]} label="题干" name="stem" disabled>
                          
                          <TextArea
                            placeholder="500字以内"
                            autoSize={{ minRows: 3, maxRows: 6 }}
                          />
                          </Form.Item>
                          <Form.Item rules={[{required: true,}]} label="分数" name="value">
                          <InputNumber min={0} max={10} defaultValue={0}/>
                          </Form.Item>
                          <Form.Item  rules={[{required: true,}]}label="正确选项" name="correctans">
                            <Radio.Group onChange={this.handleanswer} value={this.state.answer} >
                              <Radio value="T">T</Radio>
                              <Radio value="F">F</Radio>
                            </Radio.Group>
                          </Form.Item>
                          <Form.Item >
                            <Button htmlType="submit"  >确定</Button>
                          </Form.Item>
                        </Form>
                        </TabPane>
                        </Tabs>
                        </Modal>
                        <Modal 
                          title="自动生成试卷" visible={this.state.IsGenerate}
                          onOk={this.handleGenerate} onCancel={this.handleCancle3} footer={null}
                        >
                          <Form onFinish={this.generatePaperRandomly}>
                            <Form.Item name='paper_name'  rules={[{required: true,}]}label="试卷名称" style={{width: '80%'}}>
                              <Input placeholder="请输入试卷名称"></Input>
                            </Form.Item>
                            <Form.Item name='course_id'rules={[{required: true,}]} label="课程编号" style={{width: '80%'}}>
                              <Input placeholder="请输入课程编号"></Input>
                            </Form.Item>
                            <Form.Item name='teacher_id'rules={[{required: true,}]}label="教师编号" style={{width: '80%'}}>
                              <Input placeholder='请输入教师编号'></Input>
                            </Form.Item>
                            <Form.Item name='choose_num'rules={[{required: true,}]} label='选择题数' style={{width: '80%'}}>
                              <InputNumber placeholder='请输入判断题数目'></InputNumber>
                            </Form.Item>
                            <Form.Item name='judge_num'rules={[{required: true,}]} label='判断题数' style={{width: '80%'}}>
                              <InputNumber placeholder='请输入选择题数目'></InputNumber>
                            </Form.Item>

                            <Form.Item style={{margin: '0 43% 0 43%'}} label=''>
                              <Button htmlType='submit' type="primary" >确定</Button>
                            </Form.Item>
                          </Form>

                        </Modal>
                        <Modal
                          title="批量导入题目" visible={this.state.IsScaleAdd} 
                          onCancel={this.handleCancel4} footer={null}
                        >
                          <Tabs defaultActiveKey='1'>
                            <TabPane tab='判断题' id='tab_upload_judge' key='1' >
                            <Form onFinish={this.ScaleAdd_judge} >
                              <Form.Item name='file'>
                                <Input type='file' onClick='ScaleAdd_judge' id='upload_judge'
                                placeholder='请上传判断题文件'></Input>
                              </Form.Item>
                              <Form.Item style={{margin: '0 40% 0 40%'}}>
                                <Button htmlType='submit' type='primary'>确定</Button>
                              </Form.Item>
                              </Form>
                            </TabPane>
                            <TabPane tab='选择题' key='2' id='tab_upload_choose'>
                            <Form onFinish={this.ScaleAdd_choose} >
                              <Form.Item name='file'>
                                <Input type='file' onClick='ScaleAdd_choose' id='upload_choose'
                                placeholder='请上传选择题文件'></Input>
                              </Form.Item>
                              <Form.Item style={{margin: '0 40% 0 40%'}}>
                                <Button htmlType='submit' type='primary'>确定</Button>
                              </Form.Item>
                              </Form>
                            </TabPane>
                          </Tabs>
 

                        </Modal>
                        <Modal visible={this.state.IsEditJudge} onCancel={this.handleCancleEditJudge} footer={null}>
                          <Form onFinish={this.EditJudge}>
                            
                    
                              <Form.Item label="题干" name="stem" disabled>
                              <textarea rows={4} placeholder="500字以内" autoSize={{ minRows: 3, maxRows: 6 }}>
                                {this.state.old_stem}
                              </textarea>
                              </Form.Item>
                              <Form.Item label="分数" name="value">
                                <InputNumber min={0} max={10} defaultValue={this.state.old_val}/>
                              </Form.Item>
                              <Form.Item label="正确选项" name="correctans">
                                <Radio.Group onChange={this.handleanswer} value={this.state.answer} >
                                  <Radio value="T">T</Radio>
                                  <Radio value="F">F</Radio>
                                </Radio.Group>
                              </Form.Item>
                              <Form.Item >
                                <Button htmlType="submit" >确定</Button>
                              </Form.Item>
                            
                            
                          </Form>
                        </Modal>
                        <Modal visible={this.state.IsEditChoose} onCancel={this.handleCancleEditChoose}>
                            <Form
                            labelCol={{span: 30,}} wrapperCol={{span: 30,}}
                            layout="horizontal" onFinish={this.EditChoose}>

                            <Form.Item label="题干" name="stem" disabled>
                              <textarea rows={4} placeholder="500字以内" autoSize={{ minRows: 3, maxRows: 6 }} >
                                {this.state.old_stem}
                              </textarea>
                            </Form.Item>
                            <Form.Item label="选项A" name="selectA">
                              <textarea rows={2} placeholder="200字以内" autoSize={{ minRows: 2, maxRows: 4 }}>
                                {this.state.optionA}
                              </textarea>
                            </Form.Item>
                            <Form.Item label="选项B" name="selectB">
                              <textarea rows={1} placeholder="200字以内" autoSize={{ minRows: 2, maxRows: 4 }}>
                                {this.state.optionB}
                              </textarea>
                            </Form.Item>
                            <Form.Item label="选项C" name="selectC">
                              <textarea placeholder="200字以内" autoSize={{ minRows: 2, maxRows: 4 }}>
                                {this.state.optionC}
                              </textarea>
                            </Form.Item>
                            <Form.Item label="选项D" name="selectD">
                              <textarea rows={1} placeholder="200字以内" autoSize={{ minRows: 2, maxRows: 4 }}>
                                {this.state.optionD}
                              </textarea>
                            </Form.Item>
                            <Form.Item label="分数" name="value">
                            <InputNumber min={0} max={10} defaultValue={this.state.old_val}/>
                            </Form.Item>
                            <Form.Item label="正确选项" name="correctans">
                              <Radio.Group onChange={this.handleanswer} value={this.state.answer} >
                                <Radio value="A">A</Radio>
                                <Radio value="B">B</Radio>
                                <Radio value="C">C</Radio>
                                <Radio value="D">D</Radio>
                              </Radio.Group>
                            </Form.Item>
                            <Form.Item label="">
                              <Button htmlType="submit"  >确定</Button>
                            </Form.Item>
                          </Form>
                        </Modal>

                        <Button type="primary" style={{margin: '0 30px 0 0'}} onClick={this.showModal3}>自动生成试卷</Button>
                        <Button type="primary" onClick={this.showModal} style={{margin: '0 30px 0 0'}}>添加题目</Button>
                        <Button type="primary" onClick={this.showModal4} style={{margin: '0 30px 0 0'}}>批量导入题目</Button>
                        <Button type='primary' onClick={()=>{this.showEdit(selectedRowKeys)}} style={{margin: '0 30px 0 0'}}>编辑</Button>
                        <Button type="primary" onClick={() => { this.deleteques(selectedRowKeys) }} style={{margin: '0 30px 0 0'}} danger>删除</Button>
                    </div>
                    <div id="testing"></div>
                    <div id="QB_content">
                      <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={datasourceonlinetestteacher}
                        onRow={(record) => ({
                          onClick: () => {
                            this.selectRow(record);}
                        })}>
                      </Table>
                    </div>
                  
            </div>
          </Content>

    )
  }
}

export default TeacherCenter;
