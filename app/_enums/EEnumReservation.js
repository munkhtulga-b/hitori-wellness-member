const ReservationEnum = {
  PROGRAM: {
    queryString: "program",
    next: "time", // If the app needs coach, use "coach" instead
    value: 1,
  },
  COACH: {
    queryString: "coach",
    next: "time",
    value: 2,
  },
  TIMESLOT: {
    queryString: "time",
    value: 3,
  },
};

export default ReservationEnum;
