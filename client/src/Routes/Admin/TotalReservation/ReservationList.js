import React, { useState, useEffect } from "react";
import { Table, PageHeader, Tag } from "antd";
import axios from "axios";
const { Column } = Table;

function ReservationList() {
  const [Reservation, setReservation] = useState([]);

  useEffect(() => {
    axios
      .post("/api/reservation/getList")
      .then((response) => {
        if (response.data.success) {
          console.log("성공", response.data.doc);
          setReservation(response.data.doc);
        } else {
          console.log("실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PageHeader
      title="Reservation List"
      className="site-page-header"
      tags={<Tag color="blue">예매</Tag>}
      avatar={{
        src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
      }}
    >
      <div style={{ width: "80%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <br />

          <Table dataSource={Reservation}>
            <Column title="영화번호" dataIndex="id" key="id" />
            <Column title="제목" dataIndex="title" key="title" />
            <Column
              title="상영관"
              dataIndex="theaters"
              key="theaters"
              render={(theaters) => (
                <>
                  {theaters.map((item, index) => (
                    <Tag key={index}>{item.theaters}</Tag>
                  ))}
                </>
              )}
            />
            <Column
              title="예매날짜"
              dataIndex="selectDay"
              key="selectDay"
              render={(selectDay) => (
                <>
                  {selectDay.map((item, index) => (
                    <Tag key={index}>
                      {item.year}.{item.month}.{item.day}
                    </Tag>
                  ))}
                </>
              )}
            />
            <Column
              title="시작시간"
              dataIndex="time"
              key="time"
              render={(time) => (
                <>
                  {time.map((item, index) => (
                    <Tag key={index}>{item.time}</Tag>
                  ))}
                </>
              )}
            />
            <Column title="인원" dataIndex="continent" key="continent" />
            <Column title="가격" dataIndex="price" key="price" />
          </Table>
        </div>
      </div>
    </PageHeader>
  );
}

export default ReservationList;