// 2021-10-16T13:38:46.253019Z

import React from "react";
import ReactTimeAgo from "react-time-ago";

export default function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" />
    </div>
  );
}
