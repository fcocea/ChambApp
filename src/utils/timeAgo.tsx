import React from "react";
import { Text } from "react-native";
import ReactTimeAgo from "react-time-ago";

export default function TimeAgo(props: any) {
  return <ReactTimeAgo {...props} component={Time} timeStyle="mini" />;
}

function Time({ date, verboseDate, tooltip, children }: any) {
  return <Text>{children}</Text>;
}
