export interface ScheduleParams {
  imgPath: string;
  channel: string;
  description?: string;
  breakerOne: string;
}

export const scheduleParams = {
  commonParams: {
    imgPath: "./common/img/joker.jpeg",
    channel: "automate",
    description: "this is a test",
    breakerOne: "joy+666@57blocks.com",
  },
  changeParams: {
    imgPath: "./common/img/change.jpeg",
    channel: "automate",
    description: "test change details",
    breakerOne: "jibarra@gmail.com",
  },
};

// export const scheduleParams = {
//   commonParams: {
//     imgPath: "./common/img/joker.jpeg",
//     channel: "joy 1/7",
//     description: "this is a test",
//     breakerOne: "joy@57blocks.com",
//   },
//   changeParams: {
//     imgPath: "./common/img/change.jpeg",
//     channel: "automate",
//     description: "test change details",
//     breakerOne: "jibarra@gmail.com",
//   },
// };
export const emptyScheduleParams = {
  showName: "",
  imgFile: "",
  date: "",
  time: "",
  channel: "",
  breakerOne: "",
};
