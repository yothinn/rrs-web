export const MOCKUP_RESTUARANT_DATA = [
    {
      _id: "0001",
      name: "ร้าน Slow Food",
      displayName: "ร้าน Slow Food",
      location: {
        addressLine1: "86",
        addressProvince: "ชุมพร"
      },
      maxGuestCapacity: 20
    },
    {
      _id: "0002",
      name: "ร้านในสวน",
      displayName: "ร้านในสวน",
      location: {
        addressLine1: "86",
        addressProvince: "ชุมพร"
      },
      maxGuestCapacity: 10
    },
    {
        _id: "0003",
        name: "ตลาดนัดธรรมชาติ",
        displayName: "ตลาดนัดธรรมชาติ",
        location: {
          addressLine1: "194",
          addressProvince: "กทม."
        },
        maxGuestCapacity: 10
    },
    {
        _id: "0004",
        name: "ฐานธรรมฯสันป่าตอง",
        displayName: "ฐานธรรมฯสันป่าตอง",
        location: {
          addressLine1: "21/5",
          addressProvince: "เชียงใหม่"
        },
        maxGuestCapacity: 10
    },
    {
        _id: "0005",
        name: "ฐานธรรมฯสันป่าตอง",
        displayName: "ฐานธรรมฯสันป่าตอง",
        location: {
          addressLine1: "21/5",
          addressProvince: "เชียงใหม่"
        },
        maxGuestCapacity: 10
    },
];


export const MOCKUP_MEAL_DATA = [
  {
    _id: "M001",
    restuarant: "0001",
    meal: {
      mealName: "มื้อเช้า SlowFood",
      mealEngName: "Breakfast"
    },
    startHour: "08:00",
    endHour: "10:00",
    maxGuestCapacity: 100,
    effectiveOn: "2020-05-28",
    effectiveUtil: ""
  },
  {
    _id: "M002",
    restuarant: "0001",
    meal: {
      mealName: "มื้อกลางวัน SlowFood",
      mealEngName: "Lunch"
    },
    startHour: "10:00",
    endHour: "14:00",
    maxGuestCapacity: 100,
    effectiveOn: "2020-05-28",
    effectiveUtil: ""
  },
  {
    _id: "M003",
    restuarant: "0001",
    meal: {
      mealName: "มื้อเย็น SlowFood",
      mealEngName: "Dinner"
    },
    startHour: "16:00",
    endHour: "20:00",
    maxGuestCapacity: 100,
    effectiveOn: "2020-05-28",
    effectiveUtil: ""
  },
  {
    _id: "M004",
    restuarant: "0002",
    meal: {
      mealName: "มื้อเช้า ร้านในสวน",
      mealEngName: "Breakfast"
    },
    startHour: "08:00",
    endHour: "10:00",
    maxGuestCapacity: 100,
    effectiveOn: "2020-05-28",
    effectiveUtil: ""
  },
  {
    _id: "M005",
    restuarant: "0002",
    meal: {
      mealName: "มื้อกลางวัน ร้านในสวน",
      mealEngName: "Lunch"
    },
    startHour: "10:00",
    endHour: "14:00",
    maxGuestCapacity: 100,
    effectiveOn: "2020-05-28",
    effectiveUtil: ""
  },
  {
    _id: "M003",
    restuarant: "0002",
    meal: {
      mealName: "มื้อเย็น ร้านในสวน",
      mealEngName: "Dinner"
    },
    startHour: "16:00",
    endHour: "20:00",
    maxGuestCapacity: 100,
    effectiveOn: "2020-05-28",
    effectiveUtil: ""
  }
];