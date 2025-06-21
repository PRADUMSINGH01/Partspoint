// "use client";
// import { useState, useEffect } from "react";

// interface Part {
//   id: string;
//   partNumber: string;
//   name: string;
//   price: number;
//   compatibleMakes: string[];
//   compatibleModels: string[];
//   compatibleYears: number[];
//   engineType?: string;
// }

// interface CarModel {
//   name: string;
//   carr_life_span: number[];
//   engine: string[];
// }

// interface CarData {
//   [key: string]: CarModel[];
// }

// export default function VehicleSearch() {
//   const [selectedMaker, setSelectedMaker] = useState("");
//   const [selectedModel, setSelectedModel] = useState("");
//   const [selectedYear, setSelectedYear] = useState<number | "">("");
//   const [selectedEngine, setSelectedEngine] = useState("");

//   const [makers, setMakers] = useState<string[]>([]);
//   const [models, setModels] = useState<string[]>([]);
//   const [years, setYears] = useState<number[]>([]);
//   const [engines, setEngines] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [foundParts, setFoundParts] = useState<Part[]>([]);
//   const [searchPerformed, setSearchPerformed] = useState(false);

//   // Your actual car data structure
//   const carData: CarData = {
//     Maruti: [
//       {
//         name: "1000",
//         carr_life_span: [
//           1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
//         ],
//         engine: ["0.97L F8B Petrol"],
//       },
//       {
//         name: "800",
//         carr_life_span: [
//           1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993,
//           1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
//           2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
//         ],
//         engine: ["0.8L F8B Petrol"],
//       },
//       {
//         name: "A-STAR",
//         carr_life_span: [
//           2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
//         ],
//         engine: ["1.0L K10B Petrol"],
//       },
//       {
//         name: "ALTO",
//         carr_life_span: [
//           2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
//           2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
//           2022, 2023, 2024, 2025,
//         ],
//         engine: ["0.8L R06A Petrol", "1.0L R06A Petrol"],
//       },
//       {
//         name: "ALTO 800",
//         carr_life_span: [
//           2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
//           2023, 2024, 2025,
//         ],
//         engine: ["0.8L R06A Petrol"],
//       },
//       {
//         name: "ALTO K10",
//         carr_life_span: [
//           2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
//           2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["1.0L K10B Petrol"],
//       },
//       {
//         name: "BALENO",
//         carr_life_span: [
//           2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["1.2L K12M Dualjet Petrol"],
//       },
//       {
//         name: "BREZZA",
//         carr_life_span: [
//           2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["1.3L DDiS Diesel", "1.5L K15B Petrol"],
//       },
//       {
//         name: "CELERIO",
//         carr_life_span: [
//           2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
//           2025,
//         ],
//         engine: ["1.0L K10B Petrol"],
//       },
//       {
//         name: "CIAZ",
//         carr_life_span: [
//           2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
//           2025,
//         ],
//         engine: ["1.4L K14B Petrol", "1.3L DDiS Diesel"],
//       },
//       {
//         name: "EECO",
//         carr_life_span: [
//           2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
//           2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["1.2L K12M Petrol"],
//       },
//       {
//         name: "ERTIGA",
//         carr_life_span: [
//           2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
//           2023, 2024, 2025,
//         ],
//         engine: ["1.4L K14B Petrol", "1.3L DDiS Diesel"],
//       },
//       {
//         name: "ESTEEM",
//         carr_life_span: [
//           1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
//           2005, 2006, 2007, 2008,
//         ],
//         engine: ["1.3L G13BB Petrol", "1.5L TUD5 Diesel"],
//       },
//       {
//         name: "FRONX",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["1.0L Boosterjet Turbo Petrol", "1.2L K12N Petrol"],
//       },
//       {
//         name: "GRAND VITARA",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["1.5L K15C Petrol", "1.5L Turbo Mild Hybrid"],
//       },
//       {
//         name: "GRAND VITARA XL7",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.5L K15B Petrol", "1.5L Turbo Mild Hybrid"],
//       },
//       {
//         name: "GYPSY",
//         carr_life_span: [
//           1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995,
//           1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006,
//           2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
//           2018,
//         ],
//         engine: ["1.3L G13BB Petrol"],
//       },
//       {
//         name: "IGNIS",
//         carr_life_span: [
//           2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["1.2L K12M Petrol", "1.2L Dual Jet Mild Hybrid"],
//       },
//       {
//         name: "INVICTO",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["1.987L 4-cyl Hybrid (1987 cc)"],
//       },
//       {
//         name: "JIMNY",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.5L K15B Petrol"],
//       },
//       {
//         name: "KIZASHI",
//         carr_life_span: [2009, 2010, 2011, 2012, 2013, 2014],
//         engine: ["2.4L J24B Petrol"],
//       },
//       {
//         name: "OMNI",
//         carr_life_span: [
//           1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994,
//           1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
//           2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
//           2017, 2018, 2019,
//         ],
//         engine: ["0.8L F8B Petrol"],
//       },
//       {
//         name: "RITZ",
//         carr_life_span: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
//         engine: ["1.2L K12M Petrol"],
//       },
//       {
//         name: "S-CROSS",
//         carr_life_span: [
//           2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
//           2024, 2025,
//         ],
//         engine: ["1.6L D16A Diesel", "1.5L K15B Petrol"],
//       },
//       {
//         name: "S-PRESSO",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.0L K10B Petrol"],
//       },
//       {
//         name: "STMINGRAY",
//         carr_life_span: [2013, 2014, 2015, 2016, 2017, 2018, 2019],
//         engine: ["1.2L K12B Petrol"],
//       },
//       {
//         name: "SUPER CARRY",
//         carr_life_span: [
//           2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
//           2024, 2025,
//         ],
//         engine: ["0.8L F8C Petrol"],
//       },
//       {
//         name: "SWIFT",
//         carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.2L Z12E Petrol"],
//       },
//       {
//         name: "SWIFT DZIRE",
//         carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.2L K12B Petrol", "1.3L DDiS Diesel"],
//       },
//       {
//         name: "SX4",
//         carr_life_span: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
//         engine: ["1.6L M16A Petrol", "2.0L J20A Petrol"],
//       },
//       {
//         name: "VERSA",
//         carr_life_span: [2012, 2013, 2014],
//         engine: ["1.5L K15A Petrol"],
//       },
//       {
//         name: "WAGON R",
//         carr_life_span: [
//           1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
//           2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
//           2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["1.0L K10B Petrol", "1.2L K12B Petrol"],
//       },
//       {
//         name: "XL6",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.5L K15B Petrol", "1.5L Turbo Mild Hybrid"],
//       },
//       {
//         name: "ZEN",
//         carr_life_span: [
//           1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
//           2004, 2005, 2006,
//         ],
//         engine: ["1.0L G10A Petrol"],
//       },
//       {
//         name: "ZEN ESTILO",
//         carr_life_span: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
//         engine: ["1.0L F10D Petrol", "1.1L F10A Petrol"],
//       },
//     ],

//     "Tata-Motors": [
//       {
//         name: "ALTROZ",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: [
//           "1.2 L Revotron I3 MPi petrol",
//           "1.2 L Revotron I3 Turbo T-GDi petrol",
//           "1.5 L Revotorq I4 CRDi diesel",
//         ],
//       },
//       {
//         name: "ARIA",
//         carr_life_span: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
//         engine: ["2.2 L Dicor I4 turbodiesel (150 PS, 320 Nm)"],
//       },
//       {
//         name: "BOLT",
//         carr_life_span: [2014, 2015, 2016, 2017, 2018, 2019],
//         engine: [
//           "1.2 L Revotron I3 Turbo MPFi petrol (90 PS, 140 Nm)",
//           "1.3 L Fiat Multijet I4 CRDi diesel (75 PS, 190 Nm)",
//         ],
//       },
//       {
//         name: "CURVV",
//         carr_life_span: [2023, 2024, 2025],
//         engine: [
//           "1.2 L Hyperion I3 Turbo GDi petrol (120 PS, 225 Nm)",
//           "1.2 L Hyperion GDi I3 Turbo petrol (125 PS)",
//           "1.5 L Revotorq I4 Turbo diesel (118 PS, 260 Nm)",
//           "Permanent magnet synchronous electric motor (110 kW)",
//         ],
//       },
//       {
//         name: "ESTATE",
//         carr_life_span: [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000],
//         engine: ["1.9 L Peugeot XD88 I4 diesel (68 PS, 118 Nm)"],
//       },
//       {
//         name: "HARRIER",
//         carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0 L Multijet/Kryotec I4 turbo diesel (140 PS, 350 Nm)"],
//       },
//       {
//         name: "HEXA",
//         carr_life_span: [2016, 2017, 2018, 2019, 2020],
//         engine: ["2.2 L DW12 Varicor I4 turbo diesel"],
//       },
//       {
//         name: "INDICA",
//         carr_life_span: [
//           1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
//           2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
//         ],
//         engine: [
//           "1.2 L Safire MPFi I4 petrol",
//           "1.4 L TDi I4 turbo diesel",
//           "1.3 L Quadrajet I4 CRDi diesel",
//         ],
//       },
//       {
//         name: "INDICA VISTA",
//         carr_life_span: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
//         engine: [
//           "1.2 L Safire I4 MPFi petrol",
//           "1.4 L Safire I4 MPFi petrol (90 PS)",
//           "1.4 L TDi I4 turbo diesel (71 PS)",
//           "1.3 L Multijet I4 CRDi diesel (75 PS)",
//         ],
//       },
//       {
//         name: "INDIGO",
//         carr_life_span: [
//           2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
//           2013, 2014, 2015,
//         ],
//         engine: [
//           "1.2 L MPFi I4 petrol (68 PS)",
//           "1.4 L Dicor TDi I4 turbo diesel (70 PS, 140 Nm)",
//           "1.4 L MPFi I4 petrol (101 PS)",
//         ],
//       },
//       {
//         name: "INDIGO MANZA",
//         carr_life_span: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
//         engine: [
//           "1.4 L FIRE I4 petrol (90 PS, 116 Nm)",
//           "1.3 L Multijet I4 CRDi diesel (90 PS, 190 Nm)",
//         ],
//       },
//       {
//         name: "INDIGO MARINA",
//         carr_life_span: [2004, 2005, 2006, 2007, 2008, 2009],
//         engine: [
//           "1.4 L MPFi I4 petrol (85 PS, 120 Nm)",
//           "1.4 L Turbocharged I4 diesel (70 PS, 132 Nm)",
//         ],
//       },
//       {
//         name: "MOVUS",
//         carr_life_span: [2014, 2015, 2016],
//         engine: [
//           "2.2 L Dicor I4 turbo diesel (120 PS, 250 Nm)",
//           "2.2 L Varicor I4 turbo diesel (118 PS)",
//         ],
//       },
//       {
//         name: "NANO",
//         carr_life_span: [
//           2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
//         ],
//         engine: ["624 cc I2 SOHC MPI petrol (33 PS, 51 Nm)"],
//       },
//       {
//         name: "NEXON",
//         carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: [
//           "1.2 L Revotron I3 turbo petrol",
//           "1.5 L Revotorq I4 turbo diesel",
//           "3-phase permanent magnet synchronous electric motor",
//         ],
//       },
//       {
//         name: "PUNCH",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: [
//           "1.2 L Revotron I3 petrol",
//           "1.2 L Revotron I3 CNG bi-fuel",
//           "Permanent magnet synchronous electric motor (60 kW)",
//         ],
//       },
//       {
//         name: "SAFARI",
//         carr_life_span: [
//           1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
//           2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
//         ],
//         engine: [
//           "2.0 L XD88 I4 turbo diesel (87 PS)",
//           "2.2 L DiCOR I4 CRDi diesel (140 PS, 320 Nm)",
//           "2.0 L petrol I4 (99 kW)",
//         ],
//       },
//       {
//         name: "SIERRA",
//         carr_life_span: [
//           1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
//           2002, 2003,
//         ],
//         engine: ["2.0 L 483 DL/DLTC I4 petrol"],
//       },
//       {
//         name: "SUMO",
//         carr_life_span: [
//           1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
//           2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
//           2016, 2017, 2018, 2019,
//         ],
//         engine: [
//           "2.0 L XD88 I4 turbo diesel (87 PS)",
//           "2.2 L Dicor I4 common-rail diesel (120 PS, 250 Nm)",
//         ],
//       },
//     ],
//     Mahindra: [
//       {
//         name: "Thar",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: [
//           "2.0L mStallion Petrol",
//           "2.2L mHawk Diesel",
//           "1.5L Diesel (RWD)",
//         ],
//       },
//       {
//         name: "XUV700",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L mStallion Petrol", "2.2L mHawk Diesel"],
//       },
//       {
//         name: "Scorpio N",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["2.0L mStallion Petrol", "2.2L mHawk Diesel"],
//       },
//       {
//         name: "Scorpio Classic",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["2.2L mHawk Diesel"],
//       },
//       {
//         name: "XUV 3XO",
//         carr_life_span: [2024, 2025],
//         engine: ["1.2L TCMPFi Petrol", "1.2L TGDi Petrol", "1.5L Diesel"],
//       },
//       {
//         name: "Bolero",
//         carr_life_span: [
//           2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
//           2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
//           2022, 2023, 2024, 2025,
//         ],
//         engine: ["1.5L mHawk D75 Diesel"],
//       },
//       {
//         name: "Bolero Neo",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["1.5L mHawk100 Diesel"],
//       },
//       {
//         name: "XUV400 EV",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["Electric Motor (34.5 kWh or 39.4 kWh battery)"],
//       },
//     ],
//     Hyundai: [
//       {
//         name: "Creta",
//         carr_life_span: [
//           2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: [
//           "1.5L MPi Petrol",
//           "1.5L Turbo GDi Petrol",
//           "1.5L U2 CRDi Diesel",
//         ],
//       },
//       {
//         name: "Venue",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: [
//           "1.2L Kappa Petrol",
//           "1.0L Turbo GDi Petrol",
//           "1.5L U2 CRDi Diesel",
//         ],
//       },
//       {
//         name: "Verna",
//         carr_life_span: [
//           2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
//           2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["1.5L MPi Petrol", "1.5L Turbo GDi Petrol"],
//       },
//       {
//         name: "i20",
//         carr_life_span: [
//           2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
//           2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["1.2L Kappa Petrol", "1.0L Turbo GDi Petrol (N Line)"],
//       },
//       {
//         name: "Exter",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["1.2L Kappa Petrol/CNG"],
//       },
//       {
//         name: "Grand i10 Nios",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.2L Kappa Petrol/CNG"],
//       },
//       {
//         name: "Aura",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.2L Kappa Petrol/CNG"],
//       },
//       {
//         name: "Alcazar",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["1.5L Turbo GDi Petrol", "1.5L U2 CRDi Diesel"],
//       },
//       {
//         name: "Tucson",
//         carr_life_span: [
//           2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
//           2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["2.0L Nu Petrol", "2.0L R CRDi Diesel"],
//       },
//       {
//         name: "Ioniq 5",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["Electric Motor (72.6 kWh battery)"],
//       },
//     ],
//     Honda: [
//       {
//         name: "City",
//         carr_life_span: [
//           1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
//           2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
//           2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["1.5L i-VTEC Petrol"],
//       },
//       {
//         name: "City Hybrid",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["1.5L Petrol + e:HEV Hybrid System"],
//       },
//       {
//         name: "Amaze",
//         carr_life_span: [
//           2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
//           2024, 2025,
//         ],
//         engine: ["1.2L i-VTEC Petrol"],
//       },
//       {
//         name: "Elevate",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["1.5L i-VTEC Petrol"],
//       },
//     ],
//     Toyota: [
//       {
//         name: "Innova Crysta",
//         carr_life_span: [
//           2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["2.4L Diesel"],
//       },
//       {
//         name: "Innova Hycross",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["2.0L Petrol", "2.0L Petrol Hybrid"],
//       },
//       {
//         name: "Fortuner",
//         carr_life_span: [
//           2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
//           2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["2.7L Petrol", "2.8L Diesel"],
//       },
//       {
//         name: "Fortuner Legender",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["2.8L Diesel"],
//       },
//       {
//         name: "Urban Cruiser Hyryder",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: [
//           "1.5L Petrol Mild-Hybrid/CNG (Maruti sourced)",
//           "1.5L Petrol Strong Hybrid",
//         ],
//       },
//       {
//         name: "Glanza",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.2L Petrol/CNG (Maruti sourced)"],
//       },
//       {
//         name: "Rumion",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["1.5L Petrol/CNG (Maruti sourced)"],
//       },
//       {
//         name: "Urban Cruiser Taisor",
//         carr_life_span: [2024, 2025],
//         engine: [
//           "1.2L Petrol/CNG (Maruti sourced)",
//           "1.0L Turbo Petrol (Maruti sourced)",
//         ],
//       },
//       {
//         name: "Hilux",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["2.8L Diesel"],
//       },
//       {
//         name: "Vellfire",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.5L Petrol Hybrid"],
//       },
//       {
//         name: "Camry",
//         carr_life_span: [
//           2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
//           2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
//           2024, 2025,
//         ],
//         engine: ["2.5L Petrol Hybrid"],
//       },
//       {
//         name: "Land Cruiser",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["3.3L V6 Twin-Turbo Diesel"],
//       },
//     ],
//     Kia: [
//       {
//         name: "Seltos",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.5L Petrol", "1.5L Turbo Petrol", "1.5L Diesel"],
//       },
//       {
//         name: "Sonet",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.2L Petrol", "1.0L Turbo Petrol", "1.5L Diesel"],
//       },
//       {
//         name: "Carens",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["1.5L Petrol", "1.5L Turbo Petrol", "1.5L Diesel"],
//       },
//       {
//         name: "Syros",
//         carr_life_span: [2024, 2025],
//         engine: ["1.0L Turbo Petrol", "1.5L Diesel"],
//       },
//       {
//         name: "EV6",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["Electric Motor (77.4 kWh battery)"],
//       },
//       {
//         name: "EV9",
//         carr_life_span: [2024, 2025],
//         engine: ["Electric Motor (Large Battery ~99.8 kWh)"],
//       },
//     ],
//     Volkswagen: [
//       {
//         name: "Virtus",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["1.0L TSI Petrol", "1.5L TSI EVO Petrol"],
//       },
//       {
//         name: "Taigun",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["1.0L TSI Petrol", "1.5L TSI EVO Petrol"],
//       },
//       {
//         name: "Tiguan",
//         carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L TSI Petrol"],
//       },
//     ],
//     Renault: [
//       {
//         name: "Kwid",
//         carr_life_span: [
//           2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["0.8L SCe Petrol", "1.0L SCe Petrol"],
//       },
//       {
//         name: "Kiger",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["1.0L Energy Petrol", "1.0L Turbo Petrol"],
//       },
//       {
//         name: "Triber",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.0L Energy Petrol", "1.0L Turbo Petrol"],
//       },
//     ],
//     Skoda: [
//       {
//         name: "Slavia",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["1.0L TSI Petrol", "1.5L TSI EVO Petrol"],
//       },
//       {
//         name: "Kushaq",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["1.0L TSI Petrol", "1.5L TSI EVO Petrol"],
//       },
//       {
//         name: "Kodiaq",
//         carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L TSI Petrol"],
//       },
//       {
//         name: "Superb",
//         carr_life_span: [
//           2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
//           2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["2.0L TSI Petrol"],
//       },
//     ],
//     Nissan: [
//       {
//         name: "Magnite",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.0L B4D Petrol", "1.0L HRA0 Turbo Petrol"],
//       },
//     ],
//     Ford: [
//       {
//         name: "Ecosport",
//         carr_life_span: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
//         engine: [
//           "1.5L Ti-VCT Petrol",
//           "1.0L EcoBoost Petrol",
//           "1.5L TDCi Diesel",
//         ],
//       },
//       {
//         name: "Figo",
//         carr_life_span: [
//           2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
//           2021,
//         ],
//         engine: ["1.2L Ti-VCT Petrol", "1.5L TDCi Diesel"],
//       },
//       {
//         name: "Aspire",
//         carr_life_span: [2015, 2016, 2017, 2018, 2019, 2020, 2021],
//         engine: ["1.2L Ti-VCT Petrol", "1.5L TDCi Diesel"],
//       },
//       {
//         name: "Endeavour",
//         carr_life_span: [
//           2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
//           2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
//         ],
//         engine: ["2.2L TDCi Diesel", "3.2L TDCi Diesel", "2.0L EcoBlue Diesel"],
//       },
//     ],
//     "MG Motor": [
//       {
//         name: "Hector",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.5L Turbo Petrol", "1.5L Petrol Hybrid", "2.0L Diesel"],
//       },
//       {
//         name: "Hector Plus",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["1.5L Turbo Petrol", "1.5L Petrol Hybrid", "2.0L Diesel"],
//       },
//       {
//         name: "Astor",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["1.5L VTi-TECH Petrol", "1.3L Turbo Petrol"],
//       },
//       {
//         name: "Gloster",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L Diesel", "2.0L Twin-Turbo Diesel"],
//       },
//       {
//         name: "ZS EV",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["Electric Motor (Multiple battery options over time)"],
//       },
//       {
//         name: "Comet EV",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["Electric Motor (Small Battery)"],
//       },
//     ],
//     Jeep: [
//       {
//         name: "Compass",
//         carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L Multijet Diesel"],
//       },
//       {
//         name: "Meridian",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["2.0L Multijet Diesel"],
//       },
//       {
//         name: "Wrangler",
//         carr_life_span: [
//           2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["2.0L Turbo Petrol"],
//       },
//       {
//         name: "Grand Cherokee",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["2.0L Turbo Petrol"],
//       },
//     ],
//     BMW: [
//       {
//         name: "3 Series / 3 Series Gran Limousine",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L Turbo Petrol (330i/Li)", "2.0L Turbo Diesel (320d/Ld)"],
//       },
//       {
//         name: "X1",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["1.5L Turbo Petrol", "2.0L Turbo Diesel"],
//       },
//       {
//         name: "X5",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["3.0L Turbo Petrol", "3.0L Turbo Diesel"],
//       },
//       {
//         name: "7 Series",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["3.0L Turbo Petrol", "3.0L Turbo Diesel"],
//       },
//       {
//         name: "iX",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["Electric Motor (Multiple variants)"],
//       },
//     ],
//     "Mercedes-Benz": [
//       {
//         name: "C-Class",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["1.5L Turbo Petrol Mild-Hybrid", "2.0L Diesel Mild-Hybrid"],
//       },
//       {
//         name: "E-Class",
//         carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L Turbo Petrol", "2.0L Diesel", "3.0L Diesel"],
//       },
//       {
//         name: "GLC",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["2.0L Turbo Petrol Mild-Hybrid", "2.0L Diesel Mild-Hybrid"],
//       },
//       {
//         name: "GLE",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["3.0L Petrol Mild-Hybrid", "2.0L Diesel", "3.0L Diesel"],
//       },
//       {
//         name: "S-Class",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["3.0L Turbo Petrol Mild-Hybrid", "3.0L Diesel Mild-Hybrid"],
//       },
//       {
//         name: "EQS",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["Electric Motor (Multiple variants)"],
//       },
//     ],
//     Audi: [
//       {
//         name: "A4",
//         carr_life_span: [
//           2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["2.0L TFSI Petrol Mild-Hybrid"],
//       },
//       {
//         name: "A6",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L TFSI Petrol Mild-Hybrid"],
//       },
//       {
//         name: "Q3 / Q3 Sportback",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L TFSI Petrol"],
//       },
//       {
//         name: "Q5",
//         carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L TFSI Petrol Mild-Hybrid"],
//       },
//       {
//         name: "Q7",
//         carr_life_span: [
//           2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["3.0L TFSI Petrol Mild-Hybrid"],
//       },
//       {
//         name: "e-tron / Q8 e-tron",
//         carr_life_span: [2021, 2022, 2023, 2024, 2025],
//         engine: ["Electric Motor (Multiple variants)"],
//       },
//     ],
//     Lexus: [
//       {
//         name: "ES",
//         carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.5L Petrol Hybrid"],
//       },
//       {
//         name: "NX",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["2.5L Petrol Hybrid"],
//       },
//       {
//         name: "RX",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["2.4L Turbo Petrol", "2.5L Petrol Hybrid"],
//       },
//       {
//         name: "LX",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["3.3L V6 Twin-Turbo Diesel"],
//       },
//     ],
//     Jaguar: [
//       {
//         name: "F-Pace",
//         carr_life_span: [
//           2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["2.0L Ingenium Petrol", "2.0L Ingenium Diesel"],
//       },
//       {
//         name: "I-Pace",
//         carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["Electric Motor"],
//       },
//     ],
//     Porsche: [
//       {
//         name: "Macan",
//         carr_life_span: [
//           2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
//           2025,
//         ],
//         engine: ["2.0L Turbo Petrol", "2.9L V6 Twin-Turbo Petrol"],
//       },
//       {
//         name: "Cayenne / Cayenne Coupe",
//         carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: [
//           "3.0L V6 Turbo Petrol",
//           "4.0L V8 Twin-Turbo Petrol",
//           "Hybrid variants",
//         ],
//       },
//       {
//         name: "Panamera",
//         carr_life_span: [
//           2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
//           2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: [
//           "2.9L V6 Twin-Turbo Petrol",
//           "4.0L V8 Twin-Turbo Petrol",
//           "Hybrid variants",
//         ],
//       },
//       {
//         name: "Taycan",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["Electric Motor (Multiple variants)"],
//       },
//       {
//         name: "911",
//         carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: [
//           "3.0L Flat-6 Twin-Turbo Petrol",
//           "3.8L Flat-6 Twin-Turbo Petrol",
//           "4.0L Flat-6 NA Petrol (GT3)",
//         ],
//       },
//     ],
//     Volvo: [
//       {
//         name: "XC40",
//         carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L Petrol Mild-Hybrid"],
//       },
//       {
//         name: "XC40 Recharge",
//         carr_life_span: [2022, 2023, 2024, 2025],
//         engine: ["Electric Motor (Single/Dual)"],
//       },
//       {
//         name: "XC60",
//         carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L Petrol Mild-Hybrid"],
//       },
//       {
//         name: "XC90",
//         carr_life_span: [
//           2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["2.0L Petrol Mild-Hybrid"],
//       },
//       {
//         name: "S90",
//         carr_life_span: [
//           2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: ["2.0L Petrol Mild-Hybrid"],
//       },
//       {
//         name: "C40 Recharge",
//         carr_life_span: [2023, 2024, 2025],
//         engine: ["Electric Motor (Single/Dual)"],
//       },
//     ],
//     "Land Rover": [
//       {
//         name: "Range Rover Evoque",
//         carr_life_span: [
//           2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
//           2022, 2023, 2024, 2025,
//         ],
//         engine: [
//           "2.0L Ingenium Petrol Mild-Hybrid",
//           "2.0L Ingenium Diesel Mild-Hybrid",
//         ],
//       },
//       {
//         name: "Discovery Sport",
//         carr_life_span: [
//           2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: [
//           "2.0L Ingenium Petrol Mild-Hybrid",
//           "2.0L Ingenium Diesel Mild-Hybrid",
//         ],
//       },
//       {
//         name: "Range Rover Velar",
//         carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
//         engine: ["2.0L Ingenium Petrol", "2.0L Ingenium Diesel"],
//       },
//       {
//         name: "Defender",
//         carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
//         engine: [
//           "2.0L Ingenium Petrol",
//           "3.0L Ingenium Petrol Mild-Hybrid",
//           "3.0L Ingenium Diesel Mild-Hybrid",
//           "5.0L Supercharged V8 Petrol",
//         ],
//       },
//       {
//         name: "Range Rover Sport",
//         carr_life_span: [
//           2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
//           2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
//         ],
//         engine: [
//           "3.0L Ingenium Petrol Mild-Hybrid",
//           "3.0L Ingenium Diesel Mild-Hybrid",
//         ],
//       },
//       {
//         name: "Range Rover",
//         carr_life_span: [
//           1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980,
//           1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
//           1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002,
//           2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
//           2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
//           2025,
//         ],
//         engine: [
//           "3.0L Ingenium Petrol Mild-Hybrid",
//           "3.0L Ingenium Diesel Mild-Hybrid",
//           "4.4L Twin-Turbo V8 Petrol",
//         ],
//       },
//     ],
//   };

//   // Initialize makers on mount
//   useEffect(() => {
//     setMakers(Object.keys(carData));
//   }, []);

//   // Update models when maker changes
//   useEffect(() => {
//     if (selectedMaker) {
//       const makerModels = carData[selectedMaker].map((model) => model.name);
//       setModels(makerModels);
//     } else {
//       setModels([]);
//     }
//     // Reset dependent values
//     setSelectedModel("");
//     setSelectedYear("");
//     setSelectedEngine("");
//     setYears([]);
//     setEngines([]);
//   }, [selectedMaker]);

//   // Update years and engines when model changes
//   useEffect(() => {
//     if (selectedMaker && selectedModel) {
//       const selectedModelData = carData[selectedMaker].find(
//         (model) => model.name === selectedModel
//       );

//       if (selectedModelData) {
//         setYears(selectedModelData.carr_life_span);
//         setEngines(selectedModelData.engine);
//       }
//     }
//     // Reset dependent values
//     setSelectedYear("");
//     setSelectedEngine("");
//   }, [selectedModel, selectedMaker]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedEngine || !selectedYear) return;

//     setLoading(true);
//     setSearchPerformed(true);

//     try {
//       // Example filter - replace with your actual parts data
//       const compatibleParts = mockParts.filter(
//         (part) =>
//           part.compatibleMakes.includes(selectedMaker) &&
//           part.compatibleModels.includes(selectedModel) &&
//           part.compatibleYears.includes(selectedYear) &&
//           part.engineType === selectedEngine
//       );

//       setFoundParts(compatibleParts);
//     } catch (error) {
//       console.error("Error searching parts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {/* Maker Select */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Make
//           </label>
//           <select
//             value={selectedMaker}
//             onChange={(e) => setSelectedMaker(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             required
//           >
//             <option value="">Select Maker</option>
//             {makers.map((maker) => (
//               <option key={maker} value={maker}>
//                 {maker}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Model Select */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Model
//           </label>
//           <select
//             value={selectedModel}
//             onChange={(e) => setSelectedModel(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             disabled={!selectedMaker}
//             required
//           >
//             <option value="">Select Model</option>
//             {models.map((model) => (
//               <option key={model} value={model}>
//                 {model}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Year Select */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Year
//           </label>
//           <select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(Number(e.target.value))}
//             className="w-full p-2 border rounded-md"
//             disabled={!selectedModel}
//             required
//           >
//             <option value="">Select Year</option>
//             {years.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Engine Select */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Engine
//           </label>
//           <select
//             value={selectedEngine}
//             onChange={(e) => setSelectedEngine(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             disabled={!selectedYear}
//             required
//           >
//             <option value="">Select Engine</option>
//             {engines.map((engine) => (
//               <option key={engine} value={engine}>
//                 {engine}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="mt-6">
//         <button
//           type="submit"
//           className="bg-primary hover:bg-secondary w-full text-white px-8 py-3 rounded-lg font-heading font-semibold transition-all"
//           disabled={!selectedEngine || loading}
//         >
//           {loading ? "Finding Parts..." : "Find Parts"}
//         </button>
//       </div>

//       {/* Results Section */}
//       {searchPerformed && (
//         <div className="mt-8">
//           {loading ? (
//             <div className="text-center text-gray-500">
//               Searching for compatible parts...
//             </div>
//           ) : foundParts.length > 0 ? (
//             <>
//               <h2 className="text-xl font-semibold mb-4">Found Parts:</h2>
//               <ul>
//                 {foundParts.map((part) => (
//                   <li key={part.id} className="mb-2 border-b pb-2">
//                     <strong>{part.name}</strong> ({part.partNumber}) - $
//                     {part.price.toFixed(2)}
//                     <p className="text-sm text-gray-600">
//                       Compatible with: {part.compatibleMakes.join(", ")}{" "}
//                       {part.compatibleModels.join(", ")} (
//                       {part.compatibleYears.join(", ")})
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </>
//           ) : (
//             <div className="text-center text-gray-500">
//               No compatible parts found for the selected vehicle.
//             </div>
//           )}
//         </div>
//       )}
//     </form>
//   );
// }

// // Example mock parts data - replace with your actual data
// const mockParts: Part[] = [
//   {
//     id: "1",
//     partNumber: "SWF-123",
//     name: "Air Filter",
//     price: 29.99,
//     compatibleMakes: ["Maruti"],
//     compatibleModels: ["Swift"],
//     compatibleYears: [2024, 2025],
//     engineType: "1.2L Z12E Petrol",
//   },
// ];

"use client";
import { useState, useEffect } from "react";

interface Part {
  id: string;
  partNumber: string;
  name: string;
  price: number;
  compatibleMakes: string[];
  compatibleModels: string[];
  compatibleYears: number[];
  engineType?: string;
}

// --- MODIFIED DATA STRUCTURES ---
// Interface for a specific engine type with its launch year
interface Engine {
  name: string;
  launchYear: number;
}

// Interface for a car model
interface CarModel {
  name: string;
  carr_life_span: number[];
  engines: Engine[]; // Changed from 'engine' to 'engines' for clarity
}

// Main data structure for all car data
interface CarData {
  [key: string]: CarModel[];
}

export default function VehicleSearch() {
  // --- STATE MANAGEMENT ---
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedEngineName, setSelectedEngineName] = useState(""); // State for the selected engine name

  const [makers, setMakers] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [engines, setEngines] = useState<Engine[]>([]); // State now holds Engine objects

  const [loading, setLoading] = useState(false);
  const [foundParts, setFoundParts] = useState<Part[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // --- UPDATED CAR DATA with Engine Launch Years ---
  // (A small subset is shown here for brevity; you would update your entire dataset)
  const carData: CarData = {
    Maruti: [
      {
        name: "1000",
        carr_life_span: [1990, 1991, 1992, 1993, 1994],
        engines: [{ name: "0.97L F10A Petrol (Carburetor)", launchYear: 1990 }],
      },
      {
        name: "800",
        carr_life_span: [
          1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993,
          1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
          2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
        ],
        engines: [
          { name: "796cc F8B Petrol (Carburetor)", launchYear: 1983 },
          { name: "796cc F8D Petrol (MPFI, 12-valve)", launchYear: 2000 },
          { name: "796cc F8B Petrol (MPFI, 6-valve)", launchYear: 2000 },
        ],
      },
      {
        name: "A-STAR",
        carr_life_span: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        engines: [{ name: "1.0L K10B Petrol", launchYear: 2008 }],
      },
      {
        name: "ALTO",
        carr_life_span: [
          2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
          2011, 2012,
        ],
        engines: [{ name: "796cc F8D Petrol", launchYear: 2000 }],
      },
      {
        name: "ALTO 800",
        carr_life_span: [
          2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
          2023,
        ],
        engines: [
          { name: "796cc F8D Petrol", launchYear: 2012 },
          { name: "796cc F8D CNG", launchYear: 2014 },
        ],
      },
      {
        name: "ALTO K10",
        carr_life_span: [
          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
          2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "1.0L K10B Petrol", launchYear: 2010 },
          { name: "1.0L K10C DualJet Petrol", launchYear: 2022 },
          { name: "1.0L K10C CNG", launchYear: 2022 },
        ],
      },
      {
        name: "BALENO",
        carr_life_span: [
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "1.2L K12M Petrol", launchYear: 2015 },
          { name: "1.3L D13A DDiS Diesel", launchYear: 2015 },
          { name: "1.0L K10C Boosterjet Petrol (RS)", launchYear: 2017 },
          { name: "1.2L K12N Dualjet Petrol (Smart Hybrid)", launchYear: 2019 },
          { name: "1.2L K12N Dualjet Petrol (New Gen)", launchYear: 2022 },
          { name: "1.2L K12N CNG", launchYear: 2022 },
        ],
      },
      {
        name: "BREZZA",
        carr_life_span: [
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "1.3L D13A DDiS Diesel", launchYear: 2016 },
          { name: "1.5L K15B Petrol (Smart Hybrid)", launchYear: 2020 },
          { name: "1.5L K15C Dualjet Petrol (Smart Hybrid)", launchYear: 2022 },
          { name: "1.5L K15C CNG", launchYear: 2023 },
        ],
      },
      {
        name: "CELERIO",
        carr_life_span: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
          2025,
        ],
        engines: [
          { name: "1.0L K10B Petrol", launchYear: 2014 },
          { name: "0.8L DDiS 125 Diesel", launchYear: 2015 },
          { name: "1.0L K10C DualJet Petrol", launchYear: 2021 },
          { name: "1.0L K10C CNG", launchYear: 2022 },
        ],
      },
      {
        name: "CIAZ",
        carr_life_span: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
          2025,
        ],
        engines: [
          { name: "1.4L K14B Petrol", launchYear: 2014 },
          { name: "1.3L D13A DDiS Diesel (SHVS)", launchYear: 2015 },
          { name: "1.5L K15B Petrol (Smart Hybrid)", launchYear: 2018 },
          { name: "1.5L E15A DDiS Diesel", launchYear: 2019 },
        ],
      },
      {
        name: "EECO",
        carr_life_span: [
          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
          2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "1.2L G12B Petrol", launchYear: 2010 },
          { name: "1.2L G12B CNG", launchYear: 2010 },
          { name: "1.2L K12N Dualjet Petrol", launchYear: 2022 },
        ],
      },
      {
        name: "ERTIGA",
        carr_life_span: [
          2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
          2023, 2024, 2025,
        ],
        engines: [
          { name: "1.4L K14B Petrol", launchYear: 2012 },
          { name: "1.3L D13A DDiS Diesel", launchYear: 2012 },
          { name: "1.5L K15B Petrol (Smart Hybrid)", launchYear: 2018 },
          { name: "1.5L E15A DDiS Diesel", launchYear: 2019 },
          { name: "1.5L K15C Dualjet Petrol (Smart Hybrid)", launchYear: 2022 },
          { name: "1.5L K15C CNG", launchYear: 2022 },
        ],
      },
      {
        name: "ESTEEM",
        carr_life_span: [
          1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
          2005, 2006, 2007,
        ],
        engines: [
          { name: "1.3L G13BA Petrol (Carburetor)", launchYear: 1994 },
          { name: "1.3L G13BB Petrol (MPFI)", launchYear: 2000 },
        ],
      },
      {
        name: "FRONX",
        carr_life_span: [2023, 2024, 2025],
        engines: [
          { name: "1.2L K12N Dualjet Petrol", launchYear: 2023 },
          {
            name: "1.0L K10C Boosterjet Petrol (Smart Hybrid)",
            launchYear: 2023,
          },
          { name: "1.2L K12N CNG", launchYear: 2023 },
        ],
      },
      {
        name: "GRAND VITARA",
        carr_life_span: [2022, 2023, 2024, 2025],
        engines: [
          { name: "1.5L K15C Petrol (Smart Hybrid)", launchYear: 2022 },
          {
            name: "1.5L Toyota M15D-FXE Petrol (Intelligent Electric Hybrid)",
            launchYear: 2022,
          },
          { name: "1.5L K15C CNG", launchYear: 2023 },
        ],
      },
      {
        name: "GYPSY",
        carr_life_span: [
          1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995,
          1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006,
          2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
          2018,
        ],
        engines: [
          { name: "1.0L F10A Petrol", launchYear: 1985 },
          { name: "1.3L G13BA Petrol (Carburetor)", launchYear: 1996 },
          { name: "1.3L G13BB Petrol (MPFI)", launchYear: 2000 },
        ],
      },
      {
        name: "IGNIS",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.2L K12M Petrol", launchYear: 2017 },
          { name: "1.3L D13A DDiS Diesel", launchYear: 2017 },
        ],
      },
      {
        name: "INVICTO",
        carr_life_span: [2023, 2024, 2025],
        engines: [
          {
            name: "2.0L Toyota M20A-FXS Petrol (Intelligent Electric Hybrid)",
            launchYear: 2023,
          },
        ],
      },
      {
        name: "JIMNY",
        carr_life_span: [2023, 2024, 2025],
        engines: [{ name: "1.5L K15B Petrol", launchYear: 2023 }],
      },
      {
        name: "KIZASHI",
        carr_life_span: [2011, 2012, 2013, 2014],
        engines: [{ name: "2.4L J24B Petrol", launchYear: 2011 }],
      },
      {
        name: "OMNI",
        carr_life_span: [
          1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994,
          1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
          2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
          2017, 2018, 2019,
        ],
        engines: [{ name: "796cc F8B Petrol", launchYear: 1984 }],
      },
      {
        name: "RITZ",
        carr_life_span: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
        engines: [
          { name: "1.2L K12M Petrol", launchYear: 2009 },
          { name: "1.3L D13A DDiS Diesel", launchYear: 2009 },
        ],
      },
      {
        name: "S-CROSS",
        carr_life_span: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        engines: [
          { name: "1.3L D13A DDiS Diesel", launchYear: 2015 },
          { name: "1.6L D16AA DDiS Diesel", launchYear: 2015 },
          { name: "1.5L K15B Petrol (Smart Hybrid)", launchYear: 2020 },
        ],
      },
      {
        name: "S-PRESSO",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.0L K10B Petrol", launchYear: 2019 },
          { name: "1.0L K10C DualJet Petrol", launchYear: 2022 },
          { name: "1.0L K10C CNG", launchYear: 2022 },
        ],
      },
      {
        name: "SWIFT",
        carr_life_span: [
          2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "1.3L G13B Petrol", launchYear: 2005 },
          { name: "1.3L D13A DDiS Diesel", launchYear: 2007 },
          { name: "1.2L K12M Petrol", launchYear: 2010 },
          { name: "1.2L K12N Dualjet Petrol", launchYear: 2021 },
          { name: "1.2L Z12E Petrol", launchYear: 2024 },
        ],
      },
      {
        name: "SWIFT DZIRE",
        carr_life_span: [
          2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
          2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "1.3L G13B Petrol", launchYear: 2008 },
          { name: "1.3L D13A DDiS Diesel", launchYear: 2008 },
          { name: "1.2L K12M Petrol", launchYear: 2010 },
          { name: "1.2L K12N Dualjet Petrol", launchYear: 2020 },
          { name: "1.2L K12N CNG", launchYear: 2022 },
        ],
      },
      {
        name: "SX4",
        carr_life_span: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
        engines: [
          { name: "1.6L M16A Petrol", launchYear: 2007 },
          { name: "1.3L D13A DDiS Diesel", launchYear: 2011 },
        ],
      },
      {
        name: "VERSA",
        carr_life_span: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
        engines: [{ name: "1.3L G13BB Petrol", launchYear: 2001 }],
      },
      {
        name: "WAGON R",
        carr_life_span: [
          1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
          2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "1.1L F10D Petrol", launchYear: 1999 },
          { name: "1.0L K10B Petrol", launchYear: 2010 },
          { name: "1.2L K12M Petrol", launchYear: 2019 },
          { name: "1.0L K10C DualJet Petrol", launchYear: 2022 },
          { name: "1.2L K12N DualJet Petrol", launchYear: 2022 },
          { name: "1.0L K10C CNG", launchYear: 2022 },
        ],
      },
      {
        name: "XL6",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.5L K15B Petrol (Smart Hybrid)", launchYear: 2019 },
          { name: "1.5L K15C Dualjet Petrol (Smart Hybrid)", launchYear: 2022 },
          { name: "1.5L K15C CNG", launchYear: 2022 },
        ],
      },
      {
        name: "ZEN",
        carr_life_span: [
          1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
          2004, 2005, 2006,
        ],
        engines: [
          { name: "1.0L G10B Petrol (Carburetor & MPFI)", launchYear: 1993 },
        ],
      },
      {
        name: "ZEN ESTILO",
        carr_life_span: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
        engines: [
          { name: "1.1L F10D Petrol", launchYear: 2006 },
          { name: "1.0L K10B Petrol", launchYear: 2009 },
        ],
      },
    ],
    Mahindra: [
      {
        name: "ALTURAS G4",
        carr_life_span: [2018, 2019, 2020, 2021, 2022],
        engines: [{ name: "2.2L mHawk Diesel", launchYear: 2018 }],
      },
      {
        name: "BOLERO",
        carr_life_span: [
          2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
          2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
          2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "2.5L m2DICR Diesel", launchYear: 2000 },
          { name: "1.5L mHawk75 Diesel", launchYear: 2018 },
        ],
      },
      {
        name: "THAR",
        carr_life_span: [
          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2020, 2021, 2022,
          2023, 2024, 2025,
        ],
        engines: [
          { name: "2.5L CRDe Diesel", launchYear: 2010 },
          { name: "2.0L mStallion Petrol", launchYear: 2020 },
          { name: "2.2L mHawk Diesel", launchYear: 2020 },
        ],
      },
      {
        name: "SCORPIO",
        carr_life_span: [
          2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
          2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
          2024, 2025,
        ],
        engines: [
          { name: "2.6L Turbo Diesel", launchYear: 2002 },
          { name: "2.2L mHawk Diesel", launchYear: 2006 },
          { name: "2.0L mStallion Petrol", launchYear: 2022 },
        ],
      },
      {
        name: "XUV 700",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "2.0L mStallion Turbo Petrol", launchYear: 2021 },
          { name: "2.2L mHawk Diesel", launchYear: 2021 },
        ],
      },
      {
        name: "XUV 300",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.2L Turbo Petrol", launchYear: 2019 },
          { name: "1.5L Diesel", launchYear: 2019 },
        ],
      },
      {
        name: "XUV 400",
        carr_life_span: [2023, 2024, 2025],
        engines: [
          { name: "Electric Motor (39.4 & 34.5 kWh)", launchYear: 2023 },
        ],
      },
      {
        name: "MARAZZO",
        carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023],
        engines: [{ name: "1.5L D15 Diesel", launchYear: 2018 }],
      },
      {
        name: "KUV 100",
        carr_life_span: [2016, 2017, 2018, 2019, 2020, 2021],
        engines: [
          { name: "1.2L mFalcon G80 Petrol", launchYear: 2016 },
          { name: "1.2L mFalcon D75 Diesel", launchYear: 2016 },
        ],
      },
      // Add more if you want full range
    ],

    Hyundai: [
      {
        name: "ACCENT",
        carr_life_span: [
          1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
          2010, 2011, 2012, 2013,
        ],
        engines: [{ name: "1.5 L petrol", launchYear: 1999 }],
      },
      {
        name: "ALCAZAR",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "2.0 L Nu Petrol", launchYear: 2021 },
          { name: "1.5 L VGT Diesel", launchYear: 2021 },
        ],
      },
      {
        name: "AURA",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.2 L Kappa Petrol", launchYear: 2020 },
          { name: "1.2 L U2 CRDi Diesel", launchYear: 2020 },
          { name: "1.0 L Turbo GDI Petrol", launchYear: 2020 },
        ],
      },
      {
        name: "CRETA",
        carr_life_span: [
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "1.5 L Petrol", launchYear: 2015 },
          { name: "1.5 L Diesel", launchYear: 2015 },
          { name: "1.4 L Turbo Petrol", launchYear: 2024 },
        ],
      },
      {
        name: "ELANTRA",
        carr_life_span: [
          2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
        ],
        engines: [
          { name: "1.6 L Petrol", launchYear: 2004 },
          { name: "2.0 L Petrol", launchYear: 2015 },
          { name: "1.6 L Diesel", launchYear: 2006 },
        ],
      },
      {
        name: "EON",
        carr_life_span: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
        engines: [{ name: "0.8 L Petrol", launchYear: 2011 }],
      },
      {
        name: "EXTER",
        carr_life_span: [2023, 2024, 2025],
        engines: [{ name: "1.2 L Kappa Petrol", launchYear: 2023 }],
      },
      {
        name: "GETZ",
        carr_life_span: [2004, 2005, 2006, 2007, 2008, 2009],
        engines: [
          { name: "1.3 L Petrol", launchYear: 2004 },
          { name: "1.5 L CRDi Diesel", launchYear: 2004 },
        ],
      },
      {
        name: "GRAND I10",
        carr_life_span: [
          2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
          2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [{ name: "1.2 L Petrol", launchYear: 2007 }],
      },
      {
        name: "I10",
        carr_life_span: [
          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
          2021, 2022, 2023, 2024, 2025,
        ],
        engines: [{ name: "1.2 L Petrol", launchYear: 2010 }],
      },
      {
        name: "I20",
        carr_life_span: [
          2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
          2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "1.2 L Petrol", launchYear: 2008 },
          { name: "1.4 L Diesel", launchYear: 2009 },
          { name: "1.0 L Turbo Petrol", launchYear: 2020 },
        ],
      },
      {
        name: "IONIQ 5",
        carr_life_span: [2023, 2024, 2025],
        engines: [{ name: "Electric (E-GMP, 72 kWh)", launchYear: 2023 }],
      },
      {
        name: "KONA",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.4 L Turbo Petrol", launchYear: 2019 },
          { name: "Electric EV", launchYear: 2021 },
        ],
      },
      {
        name: "SANTA FE",
        carr_life_span: [
          2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "2.0 L Diesel", launchYear: 2005 },
          { name: "2.4 L Petrol", launchYear: 2005 },
          { name: "1.6 L Hybrid", launchYear: 2019 },
        ],
      },
      {
        name: "SANTRO",
        carr_life_span: [
          1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
          2009, 2010, 2011, 2012, 2013, 2014, 2015, 2018, 2019, 2020, 2021,
          2022,
        ],
        engines: [
          { name: "1.1 L Petrol", launchYear: 1998 },
          { name: "1.1 L CNG", launchYear: 2018 },
        ],
      },
      {
        name: "SONATA",
        carr_life_span: [
          2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
          2012, 2013, 2014,
        ],
        engines: [
          { name: "2.0 L Petrol", launchYear: 2001 },
          { name: "2.4 L Petrol", launchYear: 2001 },
          { name: "2.0 L Hybrid", launchYear: 2006 },
        ],
      },
      {
        name: "TERRACAN",
        carr_life_span: [2003, 2004, 2005, 2006, 2007],
        engines: [{ name: "2.9 L Diesel", launchYear: 2003 }],
      },
      {
        name: "TUCSON",
        carr_life_span: [
          2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "2.0 L Diesel", launchYear: 2005 },
          { name: "2.0 L Petrol", launchYear: 2005 },
          { name: "1.6 L Turbo Petrol", launchYear: 2022 },
        ],
      },
      {
        name: "VENUE",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.2 L Turbo Petrol", launchYear: 2019 },
          { name: "1.5 L Diesel", launchYear: 2019 },
        ],
      },
      {
        name: "VERNA",
        carr_life_span: [
          2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
          2017, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [
          { name: "1.4 L Petrol", launchYear: 2006 },
          { name: "1.6 L Petrol", launchYear: 2016 },
          { name: "1.5 L Diesel", launchYear: 2006 },
        ],
      },
      {
        name: "XCENT",
        carr_life_span: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
        engines: [
          { name: "1.2 L Petrol", launchYear: 2014 },
          { name: "1.1 L Diesel", launchYear: 2014 },
        ],
      },
    ],

    Nissan: [
      {
        name: "350Z",
        carr_life_span: [2003, 2004, 2005, 2006, 2007, 2008, 2009],
        engines: [{ name: "3.5 L V6 Petrol", launchYear: 2003 }],
      },
      {
        name: "370Z",
        carr_life_span: [
          2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
          2020,
        ],
        engines: [{ name: "3.7 L V6 Petrol", launchYear: 2009 }],
      },
      {
        name: "EVALIA",
        carr_life_span: [2012, 2013, 2014, 2015, 2016],
        engines: [{ name: "1.5 L dCi Diesel", launchYear: 2012 }],
      },
      {
        name: "GT-R",
        carr_life_span: [
          2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
          2018, 2019, 2020, 2021,
        ],
        engines: [{ name: "3.8 L Twin Turbo V6", launchYear: 2007 }],
      },
      {
        name: "KICKS",
        carr_life_span: [2019, 2020, 2021, 2022, 2023],
        engines: [
          { name: "1.5 L Petrol", launchYear: 2019 },
          { name: "1.3 L Turbo Petrol", launchYear: 2020 },
          { name: "1.5 L dCi Diesel", launchYear: 2019 },
        ],
      },
      {
        name: "MAGNITE",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.0 L Petrol", launchYear: 2020 },
          { name: "1.0 L Turbo Petrol", launchYear: 2020 },
        ],
      },
      {
        name: "MICRA",
        carr_life_span: [
          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
        ],
        engines: [
          { name: "1.2 L Petrol", launchYear: 2010 },
          { name: "1.5 L dCi Diesel", launchYear: 2010 },
        ],
      },
      {
        name: "SUNNY",
        carr_life_span: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
        engines: [
          { name: "1.5 L Petrol", launchYear: 2011 },
          { name: "1.5 L dCi Diesel", launchYear: 2011 },
        ],
      },
      {
        name: "TEANA",
        carr_life_span: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
        engines: [
          { name: "2.0 L Petrol", launchYear: 2007 },
          { name: "2.5 L Petrol", launchYear: 2007 },
        ],
      },
      {
        name: "TERRANO",
        carr_life_span: [2013, 2014, 2015, 2016, 2017, 2018, 2019],
        engines: [
          { name: "1.6 L Petrol", launchYear: 2013 },
          { name: "1.5 L dCi Diesel", launchYear: 2013 },
        ],
      },
      {
        name: "X-TRAIL",
        carr_life_span: [
          2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
        ],
        engines: [
          { name: "2.0 L Petrol", launchYear: 2004 },
          { name: "2.2 L Diesel", launchYear: 2005 },
        ],
      },
    ],

    Tata: [
      {
        name: "ALTROZ",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.2L Revotron I3 Petrol", launchYear: 2020 },
          { name: "1.5L Revotorq I4 Turbo Diesel", launchYear: 2020 },
          { name: "1.2L Revotron I3 Turbo Petrol (iTurbo)", launchYear: 2021 },
        ],
      },
      {
        name: "ARIA",
        carr_life_span: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
        engines: [{ name: "2.2L Dicor Turbo Diesel I4", launchYear: 2010 }],
      },
      {
        name: "BOLT",
        carr_life_span: [2015, 2016, 2017, 2018, 2019],
        engines: [
          { name: "1.2L Revotron Turbocharged Petrol", launchYear: 2015 },
          { name: "1.3L Quadrajet Turbo Diesel", launchYear: 2015 },
        ],
      },
      {
        name: "CURVV",
        carr_life_span: [2024, 2025],
        engines: [
          { name: "1.2L Hyperion I3 Turbo Petrol", launchYear: 2024 },
          { name: "1.5L Revotorq I4 Turbo Diesel", launchYear: 2024 },
          {
            name: "Permanent Magnet Synchronous Motor (Curvv EV)",
            launchYear: 2024,
          },
        ],
      },
      {
        name: "ESTATE",
        carr_life_span: [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000],
        engines: [{ name: "1.9L Peugeot XD88 Diesel I4", launchYear: 1992 }],
      },
      {
        name: "HARRIER",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          {
            name: "2.0L Kryotec Diesel (Multijet II sourced)",
            launchYear: 2019,
          },
        ],
      },
      {
        name: "HEXA",
        carr_life_span: [2016, 2017, 2018, 2019, 2020],
        engines: [
          {
            name: "2.2L Varicor Diesel I4 (150PS & 170PS/156PS variants)",
            launchYear: 2017,
          },
        ],
      },
      {
        name: "INDICA",
        carr_life_span: [
          1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
          2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
        ],
        engines: [
          { name: "1.4L Petrol I4 (MPI)", launchYear: 1998 },
          {
            name: "1.4L Diesel I4 (ID/TD initially, later DiCOR CRDi)",
            launchYear: 1999,
          },
        ],
      },
      {
        name: "INDIGO",
        carr_life_span: [
          2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
          2013, 2014, 2015, 2016,
        ],
        engines: [
          { name: "1.4L Petrol (Fiat Safire, rebranded)", launchYear: 2002 },
          { name: "1.3L Quadrajet Diesel", launchYear: 2002 },
        ],
      },
      {
        name: "INDIGO MARINA",
        carr_life_span: [2006, 2007, 2008, 2009],
        engines: [
          { name: "1.4L Petrol MPI", launchYear: 2006 },
          { name: "1.4L Diesel (CR4/TDi)", launchYear: 2006 },
        ],
      },
      {
        name: "MOVUS",
        carr_life_span: [2014, 2015, 2016],
        engines: [
          {
            name: "2.2L Varicor Diesel I4 (rebadged Sumo Grande)",
            launchYear: 2014,
          },
        ],
      },
      {
        name: "NANO",
        carr_life_span: [
          2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
        ],
        engines: [{ name: "0.624L I2 SOHC MPI Petrol", launchYear: 2008 }],
      },
      {
        name: "NEXON",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.2L Revotron Turbocharged Petrol", launchYear: 2017 },
          { name: "1.5L Revotorq Diesel", launchYear: 2017 },
          {
            name: "Permanent Magnet Synchronous Motor (Nexon EV)",
            launchYear: 2020,
          },
        ],
      },
      {
        name: "PUNCH",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engines: [{ name: "1.2L Revotron Petrol MPI", launchYear: 2021 }],
      },
      {
        name: "SAFARI",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engines: [{ name: "2.0L Kryotec Diesel", launchYear: 2021 }],
      },
      {
        name: "SIERRA",
        carr_life_span: [
          1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
          2002, 2003,
        ],
        engines: [
          {
            name: "2.0L Diesel I4 (483 DL / DLTC Turbocharged)",
            launchYear: 1991,
          },
        ],
      },
      {
        name: "SUMO",
        carr_life_span: [
          1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
          2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
          2016, 2017, 2018, 2019,
        ],
        engines: [{ name: "2.0L Dicor Diesel I4", launchYear: 1994 }],
      },
      {
        name: "TIAGO",
        carr_life_span: [
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engines: [{ name: "1.2L Revotron Petrol MPI", launchYear: 2016 }],
      },
      {
        name: "TIGOR",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engines: [
          { name: "1.2L Revotron Petrol MPI", launchYear: 2017 },
          { name: "1.2L Revotron Petrol CNG", launchYear: 2020 },
        ],
      },
      {
        name: "XENON",
        carr_life_span: [
          2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
        ],
        engines: [{ name: "2.2L Dicor Diesel I4", launchYear: 2009 }],
      },
      {
        name: "ZEST",
        carr_life_span: [2014, 2015, 2016, 2017, 2018, 2019],
        engines: [
          { name: "1.2L Revotron Petrol MPI", launchYear: 2014 },
          { name: "1.3L Quadrajet Diesel", launchYear: 2014 },
        ],
      },
    ],
  };
  // --- USE EFFECT HOOKS ---

  // Initialize makers on component mount
  useEffect(() => {
    setMakers(Object.keys(carData));
  }, []);

  // Update models when maker changes
  useEffect(() => {
    if (selectedMaker && carData[selectedMaker]) {
      const makerModels = carData[selectedMaker].map((model) => model.name);
      setModels(makerModels);
    } else {
      setModels([]);
    }
    // Reset dependent values
    setSelectedModel("");
    setSelectedEngineName("");
    setSelectedYear("");
    setEngines([]);
  }, [selectedMaker]);

  // Update engines when model changes
  useEffect(() => {
    if (selectedMaker && selectedModel) {
      const selectedModelData = carData[selectedMaker].find(
        (model) => model.name === selectedModel
      );
      if (selectedModelData) {
        setEngines(selectedModelData.engines);
      }
    } else {
      setEngines([]);
    }
    // Reset dependent values
    setSelectedEngineName("");
    setSelectedYear("");
  }, [selectedModel, selectedMaker]);

  // *** NEW: Automatically set the year when an engine is selected ***
  useEffect(() => {
    if (selectedEngineName) {
      const selectedEngineData = engines.find(
        (engine) => engine.name === selectedEngineName
      );
      if (selectedEngineData) {
        setSelectedYear(selectedEngineData.launchYear);
      }
    } else {
      setSelectedYear("");
    }
  }, [selectedEngineName, engines]);

  // --- FORM SUBMISSION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEngineName || !selectedYear) return;

    setLoading(true);
    setSearchPerformed(true);

    try {
      // Example filter using mock parts data
      // const compatibleParts = await fetch("/api/searchBar", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     model: "Ciaz 1st Gen 1.3L VDI MT",
      //     engine_type: "D13A",
      //     fuel_type: "Diesel",
      //     year: 2015,
      //   }),
      // });
      console.log(setFoundParts([]));
    } catch (error) {
      console.error("Error searching parts:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- JSX RENDER ---
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Maker Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Make
          </label>
          <select
            value={selectedMaker}
            onChange={(e) => setSelectedMaker(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Maker</option>
            {makers.map((maker) => (
              <option key={maker} value={maker}>
                {maker}
              </option>
            ))}
          </select>
        </div>

        {/* Model Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={!selectedMaker}
            required
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* Engine Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Engine
          </label>
          <select
            value={selectedEngineName}
            onChange={(e) => setSelectedEngineName(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={!selectedModel}
            required
          >
            <option value="">Select Engine</option>
            {engines.map((engine) => (
              <option key={engine.name} value={engine.name}>
                {engine.name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Display (Auto-populated and disabled) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Launch Year
          </label>
          <input
            type="text"
            value={selectedYear}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
            placeholder="Launch Year"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="bg-primary hover:bg-secondary w-full text-white px-8 py-3 rounded-lg font-heading font-semibold transition-all"
          disabled={!selectedEngineName || loading}
        >
          {loading ? "Finding Parts..." : "Find Parts"}
        </button>
      </div>

      {/* Results Section */}
      {searchPerformed && (
        <div className="mt-8">
          {loading ? (
            <div className="text-center text-gray-500">
              Searching for compatible parts...
            </div>
          ) : foundParts.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Found Parts:</h2>
              <ul>
                {foundParts.map((part) => (
                  <li key={part.id} className="mb-2 border-b pb-2">
                    <strong>{part.name}</strong> ({part.partNumber}) - $
                    {part.price.toFixed(2)}
                    <p className="text-sm text-gray-600">
                      Compatible with: {selectedMaker} {selectedModel} (
                      {selectedYear}) - {selectedEngineName}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center text-gray-500">
              No compatible parts found for the selected vehicle and engine.
            </div>
          )}
        </div>
      )}
    </form>
  );
}
