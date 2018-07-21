import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button, Feed, Icon, Divider, Container, Header, Segment, Dimmer, Loader } from "semantic-ui-react";

import { FeedService } from '../services/api/FeedService';

const events = [
  {
    date: 'แจ้งเตือน',
    icon: 'calendar alternate outline',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.4312323</Feed.User> ใกล้ครบกำหนดวันจัดส่ง !</Feed.Summary>,
    extraText: 'ครบกำหนดวันจัดส่งในวันที่ 14/10/2561',
    action: "a"
  },
  {
    date: '1 Hour Ago',
    icon: 'file alternate',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.3041923</Feed.User> ถูกเพิ่มแล้ว</Feed.Summary>,
    action: "a"
  },
  {
    date: '4 days ago',
    icon: 'truck',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.3041923</Feed.User> ถูกจัดส่งแล้ว</Feed.Summary>,
    action: "a"
  },
  {
    date: '3 days ago',
    icon: 'edit',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.3041923</Feed.User> ถูกแก้ไขแล้ว</Feed.Summary>,
    action: "a"
  },
  {
    date: '4 days ago',
    icon: 'cancel',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.3041923</Feed.User> ถูกยกเลิกแล้ว</Feed.Summary>,
    action: "a"
  },
  {
    date: '4 days ago',
    icon: 'cancel',
    summary: <Feed.Summary>ใบสั่งซื้อเลขที่ <Feed.User>901.3041923</Feed.User> ถูกยกเลิกแล้ว</Feed.Summary>,
    action: "a"
  }
]

export class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this._feedService = new FeedService();
    this.state = {
      feed: null,
    };
  }

  componentDidMount() {
    this.getFeed();
  }

  reprocessSummary(feed) {
    feed.forEach((item) => {
      let summarySplit = item.summary.split("|");
      if (item.action === "po_added") {
        item.summary = <Feed.Summary>[ใบสั่งซื้อ] เลขที่ <Feed.User>{summarySplit[1]}</Feed.User> ถูกเพิ่มแล้ว</Feed.Summary>;
      } else if (item.action === "product_added") {
        item.summary = <Feed.Summary>[สินค้า] <Feed.User>{summarySplit[1]}</Feed.User> ของ Supplier <Feed.User>{summarySplit[3]}</Feed.User> ถูกเพิ่มแล้ว</Feed.Summary>;
      } else if (item.action === "po_delivered") {
        item.summary = <Feed.Summary>[ใบสั่งซื้อ] เลขที่ <Feed.User>{summarySplit[1]}</Feed.User> ถูกจัดส่งแล้ว</Feed.Summary>;
      } else if (item.action === "po_edited") {
        item.summary = <Feed.Summary>[ใบสั่งซื้อ] เลขที่ <Feed.User>{summarySplit[1]}</Feed.User> ถูกแก้ไขแล้ว</Feed.Summary>;
      } else if (item.action === "po_cancel") {
        item.summary = <Feed.Summary>[ใบสั่งซื้อ] เลขที่ <Feed.User>{summarySplit[1]}</Feed.User> ถูกยกเลิกแล้ว</Feed.Summary>;
      } else if (item.action === "alert") {
        item.summary = <Feed.Summary>[ใบสั่งซื้อ] เลขที่ <Feed.User>{summarySplit[1]}</Feed.User> ใกล้ครบกำหนดวันจัดส่ง !</Feed.Summary>;
      }
    });
    return feed;
  }

  reprocessDate(feed){
    feed.forEach((item) => {
      if (item.action != "alert") {
        item.date = item.date.replace("days","วัน")
        .replace("moments ago", "เมื่อสักครู่")
        .replace("day", "วัน")
        .replace("ago","ก่อน")
        .replace("weeks","อาทิตย์")
        .replace("years","ปี")
        .replace("week","อาทิตย์")
        .replace("year","ปี")
        .replace("month", "เดือน")
        .replace("months", "เดือน")
        .replace("hours", "ชั่วโมง")
        .replace("hour", "ชั่วโมง")
        .replace("minutes", "นาที")
        .replace("minute", "นาที")
        .replace("seconds", "วินาที")
        .replace("second", "วินาที");
      }
    });
    return feed;
  }

  getFeed() {
    let promise = this._feedService.getFeed();
    promise.then(function (response) {
      let processedSummary = this.reprocessSummary(response.data);
      let fullyProcessedSummary = this.reprocessDate(processedSummary);
      this.setState({
        feed: fullyProcessedSummary
      });
    }.bind(this));
  }

  render() {
    if (this.state.feed != null) {
      return (
        <div>
          <h2 className="alt-header">รายการแจ้งเตือน</h2>
          <Segment>
            <Feed events={this.state.feed} />
          </Segment>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="alt-header">รายการแจ้งเตือน</h2>
          <Container>
            <Dimmer active inverted>
              <Loader inverted content='กำลังโหลด'/>
            </Dimmer>
            </Container>
        </div>
      );
    }
  }
}

export default connect(
)(Dashboard);
