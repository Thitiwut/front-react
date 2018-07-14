import React from "react";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import { Button, Feed, Icon, Divider, Container } from "semantic-ui-react";

const events = [
  {
    date: 'แจ้งเตือน',
    icon: 'calendar alternate outline',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.4312323</Feed.User> ใกล้ครบกำหนดวันจัดส่ง !</Feed.Summary>,
    extraText: 'ครบกำหนดวันจัดส่งในวันที่ 14/10/2561',
  },
  {
    date: '1 Hour Ago',
    icon: 'file alternate',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.3041923</Feed.User> ถูกเพิ่มแล้ว</Feed.Summary>,
  },
  {
    date: '4 days ago',
    icon: 'truck',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.3041923</Feed.User> ถูกจัดส่งแล้ว</Feed.Summary>,
  },
  {
    date: '3 days ago',
    icon: 'edit',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.3041923</Feed.User> ถูกแก้ไขแล้ว</Feed.Summary>,
  },
  {
    date: '4 days ago',
    icon: 'cancel',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.3041923</Feed.User> ถูกยกเลิกแล้ว</Feed.Summary>,
  },
  {
    date: '4 days ago',
    icon: 'cancel',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.3041923</Feed.User> ถูกยกเลิกแล้ว</Feed.Summary>,
  }
]

export class Dashboard extends React.Component {

  render() {
    return (
      <div>
      <h2 className="alt-header">รายการแจ้งเตือน</h2>
      <Feed events={events} />
      <Divider />
    </div>
    );
  }
}

export default connect(
)(Dashboard);
