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

interface CarModel {
  name: string;
  carr_life_span: number[];
  engine: string[];
}

interface CarData {
  [key: string]: CarModel[];
}

export default function VehicleSearch() {
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedEngine, setSelectedEngine] = useState("");

  const [makers, setMakers] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [engines, setEngines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [foundParts, setFoundParts] = useState<Part[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Your actual car data structure
  const carData: CarData = {
    Maruti: [
      {
        name: "Swift",
        carr_life_span: [2024, 2025],
        engine: ["1.2L Z12E Petrol"],
      },
      {
        name: "Dzire",
        carr_life_span: [2024, 2025],
        engine: ["1.2L Z12E Petrol/CNG"],
      },
      {
        name: "Wagon R",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.0L K10C Petrol/CNG", "1.2L K12N Petrol"],
      },
      {
        name: "Alto K10",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["1.0L K10C Petrol/CNG"],
      },
      {
        name: "Ertiga",
        carr_life_span: [
          2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
          2023, 2024, 2025,
        ],
        engine: ["1.5L K15C Petrol/CNG"],
      },
      {
        name: "Brezza",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["1.5L K15C Petrol/CNG"],
      },
      {
        name: "Baleno",
        carr_life_span: [
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["1.2L K12N Petrol/CNG"],
      },
      {
        name: "Grand Vitara",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: [
          "1.5L K15C Petrol Mild-Hybrid/CNG",
          "1.5L Toyota Strong Hybrid",
        ],
      },
      {
        name: "Fronx",
        carr_life_span: [2023, 2024, 2025],
        engine: ["1.2L K12N Petrol/CNG", "1.0L Boosterjet Turbo Petrol"],
      },
      {
        name: "Jimny",
        carr_life_span: [2023, 2024, 2025],
        engine: ["1.5L K15B Petrol"],
      },
      {
        name: "XL6",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.5L K15C Petrol/CNG"],
      },
    ],
    "Tata-Motors": [
      {
        name: "Tiago",
        carr_life_span: [
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["1.2 L Revotron I3 petrol/CNG", "1.05 L Revotorq I3 diesel"],
      },
      {
        name: "Tigor",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: [
          "1.2 L Revotron I3 petrol/CNG",
          "1.2 L Revotron Turbo I3 petrol",
          "1.05 L Revotorq I3 diesel",
        ],
      },
      {
        name: "Altroz",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: [
          "1.2 L Revotron I3 petrol/CNG",
          "1.2 L Revotron turbo petrol",
          "1.5 L Revotorq I4 diesel",
        ],
      },
      {
        name: "Punch",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["1.2 L Revotron I3 petrol/CNG"],
      },
      {
        name: "Nexon",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: [
          "1.2 L Revotron Turbo Petrol",
          "1.5 L Revotorq I4 diesel",
          "Electric (EV variants)",
        ],
      },
      {
        name: "Harrier",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: [
          "2.0 L Kryotec four-cylinder turbo-diesel",
          "1.5L Turbo Petrol (Expected)",
        ],
      },
      {
        name: "Safari",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: [
          "2.0 L Kryotec four-cylinder turbo-diesel",
          "1.5L Turbo Petrol (Expected)",
        ],
      },
    ],
    Mahindra: [
      {
        name: "Thar",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: [
          "2.0L mStallion Petrol",
          "2.2L mHawk Diesel",
          "1.5L Diesel (RWD)",
        ],
      },
      {
        name: "XUV700",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L mStallion Petrol", "2.2L mHawk Diesel"],
      },
      {
        name: "Scorpio N",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["2.0L mStallion Petrol", "2.2L mHawk Diesel"],
      },
      {
        name: "Scorpio Classic",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["2.2L mHawk Diesel"],
      },
      {
        name: "XUV 3XO",
        carr_life_span: [2024, 2025],
        engine: ["1.2L TCMPFi Petrol", "1.2L TGDi Petrol", "1.5L Diesel"],
      },
      {
        name: "Bolero",
        carr_life_span: [
          2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
          2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
          2022, 2023, 2024, 2025,
        ],
        engine: ["1.5L mHawk D75 Diesel"],
      },
      {
        name: "Bolero Neo",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["1.5L mHawk100 Diesel"],
      },
      {
        name: "XUV400 EV",
        carr_life_span: [2023, 2024, 2025],
        engine: ["Electric Motor (34.5 kWh or 39.4 kWh battery)"],
      },
    ],
    Hyundai: [
      {
        name: "Creta",
        carr_life_span: [
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: [
          "1.5L MPi Petrol",
          "1.5L Turbo GDi Petrol",
          "1.5L U2 CRDi Diesel",
        ],
      },
      {
        name: "Venue",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: [
          "1.2L Kappa Petrol",
          "1.0L Turbo GDi Petrol",
          "1.5L U2 CRDi Diesel",
        ],
      },
      {
        name: "Verna",
        carr_life_span: [
          2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
          2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["1.5L MPi Petrol", "1.5L Turbo GDi Petrol"],
      },
      {
        name: "i20",
        carr_life_span: [
          2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
          2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["1.2L Kappa Petrol", "1.0L Turbo GDi Petrol (N Line)"],
      },
      {
        name: "Exter",
        carr_life_span: [2023, 2024, 2025],
        engine: ["1.2L Kappa Petrol/CNG"],
      },
      {
        name: "Grand i10 Nios",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.2L Kappa Petrol/CNG"],
      },
      {
        name: "Aura",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.2L Kappa Petrol/CNG"],
      },
      {
        name: "Alcazar",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["1.5L Turbo GDi Petrol", "1.5L U2 CRDi Diesel"],
      },
      {
        name: "Tucson",
        carr_life_span: [
          2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["2.0L Nu Petrol", "2.0L R CRDi Diesel"],
      },
      {
        name: "Ioniq 5",
        carr_life_span: [2023, 2024, 2025],
        engine: ["Electric Motor (72.6 kWh battery)"],
      },
    ],
    Honda: [
      {
        name: "City",
        carr_life_span: [
          1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
          2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
          2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["1.5L i-VTEC Petrol"],
      },
      {
        name: "City Hybrid",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["1.5L Petrol + e:HEV Hybrid System"],
      },
      {
        name: "Amaze",
        carr_life_span: [
          2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
          2024, 2025,
        ],
        engine: ["1.2L i-VTEC Petrol"],
      },
      {
        name: "Elevate",
        carr_life_span: [2023, 2024, 2025],
        engine: ["1.5L i-VTEC Petrol"],
      },
    ],
    Toyota: [
      {
        name: "Innova Crysta",
        carr_life_span: [
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["2.4L Diesel"],
      },
      {
        name: "Innova Hycross",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["2.0L Petrol", "2.0L Petrol Hybrid"],
      },
      {
        name: "Fortuner",
        carr_life_span: [
          2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
          2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["2.7L Petrol", "2.8L Diesel"],
      },
      {
        name: "Fortuner Legender",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["2.8L Diesel"],
      },
      {
        name: "Urban Cruiser Hyryder",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: [
          "1.5L Petrol Mild-Hybrid/CNG (Maruti sourced)",
          "1.5L Petrol Strong Hybrid",
        ],
      },
      {
        name: "Glanza",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.2L Petrol/CNG (Maruti sourced)"],
      },
      {
        name: "Rumion",
        carr_life_span: [2023, 2024, 2025],
        engine: ["1.5L Petrol/CNG (Maruti sourced)"],
      },
      {
        name: "Urban Cruiser Taisor",
        carr_life_span: [2024, 2025],
        engine: [
          "1.2L Petrol/CNG (Maruti sourced)",
          "1.0L Turbo Petrol (Maruti sourced)",
        ],
      },
      {
        name: "Hilux",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["2.8L Diesel"],
      },
      {
        name: "Vellfire",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.5L Petrol Hybrid"],
      },
      {
        name: "Camry",
        carr_life_span: [
          2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
          2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
          2024, 2025,
        ],
        engine: ["2.5L Petrol Hybrid"],
      },
      {
        name: "Land Cruiser",
        carr_life_span: [2023, 2024, 2025],
        engine: ["3.3L V6 Twin-Turbo Diesel"],
      },
    ],
    Kia: [
      {
        name: "Seltos",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.5L Petrol", "1.5L Turbo Petrol", "1.5L Diesel"],
      },
      {
        name: "Sonet",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.2L Petrol", "1.0L Turbo Petrol", "1.5L Diesel"],
      },
      {
        name: "Carens",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["1.5L Petrol", "1.5L Turbo Petrol", "1.5L Diesel"],
      },
      {
        name: "Syros",
        carr_life_span: [2024, 2025],
        engine: ["1.0L Turbo Petrol", "1.5L Diesel"],
      },
      {
        name: "EV6",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["Electric Motor (77.4 kWh battery)"],
      },
      {
        name: "EV9",
        carr_life_span: [2024, 2025],
        engine: ["Electric Motor (Large Battery ~99.8 kWh)"],
      },
    ],
    Volkswagen: [
      {
        name: "Virtus",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["1.0L TSI Petrol", "1.5L TSI EVO Petrol"],
      },
      {
        name: "Taigun",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["1.0L TSI Petrol", "1.5L TSI EVO Petrol"],
      },
      {
        name: "Tiguan",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L TSI Petrol"],
      },
    ],
    Renault: [
      {
        name: "Kwid",
        carr_life_span: [
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["0.8L SCe Petrol", "1.0L SCe Petrol"],
      },
      {
        name: "Kiger",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["1.0L Energy Petrol", "1.0L Turbo Petrol"],
      },
      {
        name: "Triber",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.0L Energy Petrol", "1.0L Turbo Petrol"],
      },
    ],
    Skoda: [
      {
        name: "Slavia",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["1.0L TSI Petrol", "1.5L TSI EVO Petrol"],
      },
      {
        name: "Kushaq",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["1.0L TSI Petrol", "1.5L TSI EVO Petrol"],
      },
      {
        name: "Kodiaq",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L TSI Petrol"],
      },
      {
        name: "Superb",
        carr_life_span: [
          2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["2.0L TSI Petrol"],
      },
    ],
    Nissan: [
      {
        name: "Magnite",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.0L B4D Petrol", "1.0L HRA0 Turbo Petrol"],
      },
    ],
    Ford: [
      {
        name: "Ecosport",
        carr_life_span: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
        engine: [
          "1.5L Ti-VCT Petrol",
          "1.0L EcoBoost Petrol",
          "1.5L TDCi Diesel",
        ],
      },
      {
        name: "Figo",
        carr_life_span: [
          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
          2021,
        ],
        engine: ["1.2L Ti-VCT Petrol", "1.5L TDCi Diesel"],
      },
      {
        name: "Aspire",
        carr_life_span: [2015, 2016, 2017, 2018, 2019, 2020, 2021],
        engine: ["1.2L Ti-VCT Petrol", "1.5L TDCi Diesel"],
      },
      {
        name: "Endeavour",
        carr_life_span: [
          2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
        ],
        engine: ["2.2L TDCi Diesel", "3.2L TDCi Diesel", "2.0L EcoBlue Diesel"],
      },
    ],
    "MG Motor": [
      {
        name: "Hector",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.5L Turbo Petrol", "1.5L Petrol Hybrid", "2.0L Diesel"],
      },
      {
        name: "Hector Plus",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["1.5L Turbo Petrol", "1.5L Petrol Hybrid", "2.0L Diesel"],
      },
      {
        name: "Astor",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["1.5L VTi-TECH Petrol", "1.3L Turbo Petrol"],
      },
      {
        name: "Gloster",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L Diesel", "2.0L Twin-Turbo Diesel"],
      },
      {
        name: "ZS EV",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["Electric Motor (Multiple battery options over time)"],
      },
      {
        name: "Comet EV",
        carr_life_span: [2023, 2024, 2025],
        engine: ["Electric Motor (Small Battery)"],
      },
    ],
    Jeep: [
      {
        name: "Compass",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L Multijet Diesel"],
      },
      {
        name: "Meridian",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["2.0L Multijet Diesel"],
      },
      {
        name: "Wrangler",
        carr_life_span: [
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["2.0L Turbo Petrol"],
      },
      {
        name: "Grand Cherokee",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["2.0L Turbo Petrol"],
      },
    ],
    BMW: [
      {
        name: "3 Series / 3 Series Gran Limousine",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L Turbo Petrol (330i/Li)", "2.0L Turbo Diesel (320d/Ld)"],
      },
      {
        name: "X1",
        carr_life_span: [2023, 2024, 2025],
        engine: ["1.5L Turbo Petrol", "2.0L Turbo Diesel"],
      },
      {
        name: "X5",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["3.0L Turbo Petrol", "3.0L Turbo Diesel"],
      },
      {
        name: "7 Series",
        carr_life_span: [2023, 2024, 2025],
        engine: ["3.0L Turbo Petrol", "3.0L Turbo Diesel"],
      },
      {
        name: "iX",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["Electric Motor (Multiple variants)"],
      },
    ],
    "Mercedes-Benz": [
      {
        name: "C-Class",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["1.5L Turbo Petrol Mild-Hybrid", "2.0L Diesel Mild-Hybrid"],
      },
      {
        name: "E-Class",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L Turbo Petrol", "2.0L Diesel", "3.0L Diesel"],
      },
      {
        name: "GLC",
        carr_life_span: [2023, 2024, 2025],
        engine: ["2.0L Turbo Petrol Mild-Hybrid", "2.0L Diesel Mild-Hybrid"],
      },
      {
        name: "GLE",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["3.0L Petrol Mild-Hybrid", "2.0L Diesel", "3.0L Diesel"],
      },
      {
        name: "S-Class",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["3.0L Turbo Petrol Mild-Hybrid", "3.0L Diesel Mild-Hybrid"],
      },
      {
        name: "EQS",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["Electric Motor (Multiple variants)"],
      },
    ],
    Audi: [
      {
        name: "A4",
        carr_life_span: [
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["2.0L TFSI Petrol Mild-Hybrid"],
      },
      {
        name: "A6",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L TFSI Petrol Mild-Hybrid"],
      },
      {
        name: "Q3 / Q3 Sportback",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L TFSI Petrol"],
      },
      {
        name: "Q5",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L TFSI Petrol Mild-Hybrid"],
      },
      {
        name: "Q7",
        carr_life_span: [
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["3.0L TFSI Petrol Mild-Hybrid"],
      },
      {
        name: "e-tron / Q8 e-tron",
        carr_life_span: [2021, 2022, 2023, 2024, 2025],
        engine: ["Electric Motor (Multiple variants)"],
      },
    ],
    Lexus: [
      {
        name: "ES",
        carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.5L Petrol Hybrid"],
      },
      {
        name: "NX",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["2.5L Petrol Hybrid"],
      },
      {
        name: "RX",
        carr_life_span: [2023, 2024, 2025],
        engine: ["2.4L Turbo Petrol", "2.5L Petrol Hybrid"],
      },
      {
        name: "LX",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["3.3L V6 Twin-Turbo Diesel"],
      },
    ],
    Jaguar: [
      {
        name: "F-Pace",
        carr_life_span: [
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["2.0L Ingenium Petrol", "2.0L Ingenium Diesel"],
      },
      {
        name: "I-Pace",
        carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["Electric Motor"],
      },
    ],
    Porsche: [
      {
        name: "Macan",
        carr_life_span: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
          2025,
        ],
        engine: ["2.0L Turbo Petrol", "2.9L V6 Twin-Turbo Petrol"],
      },
      {
        name: "Cayenne / Cayenne Coupe",
        carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: [
          "3.0L V6 Turbo Petrol",
          "4.0L V8 Twin-Turbo Petrol",
          "Hybrid variants",
        ],
      },
      {
        name: "Panamera",
        carr_life_span: [
          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
          2021, 2022, 2023, 2024, 2025,
        ],
        engine: [
          "2.9L V6 Twin-Turbo Petrol",
          "4.0L V8 Twin-Turbo Petrol",
          "Hybrid variants",
        ],
      },
      {
        name: "Taycan",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["Electric Motor (Multiple variants)"],
      },
      {
        name: "911",
        carr_life_span: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: [
          "3.0L Flat-6 Twin-Turbo Petrol",
          "3.8L Flat-6 Twin-Turbo Petrol",
          "4.0L Flat-6 NA Petrol (GT3)",
        ],
      },
    ],
    Volvo: [
      {
        name: "XC40",
        carr_life_span: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L Petrol Mild-Hybrid"],
      },
      {
        name: "XC40 Recharge",
        carr_life_span: [2022, 2023, 2024, 2025],
        engine: ["Electric Motor (Single/Dual)"],
      },
      {
        name: "XC60",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L Petrol Mild-Hybrid"],
      },
      {
        name: "XC90",
        carr_life_span: [
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["2.0L Petrol Mild-Hybrid"],
      },
      {
        name: "S90",
        carr_life_span: [
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: ["2.0L Petrol Mild-Hybrid"],
      },
      {
        name: "C40 Recharge",
        carr_life_span: [2023, 2024, 2025],
        engine: ["Electric Motor (Single/Dual)"],
      },
    ],
    "Land Rover": [
      {
        name: "Range Rover Evoque",
        carr_life_span: [
          2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
          2022, 2023, 2024, 2025,
        ],
        engine: [
          "2.0L Ingenium Petrol Mild-Hybrid",
          "2.0L Ingenium Diesel Mild-Hybrid",
        ],
      },
      {
        name: "Discovery Sport",
        carr_life_span: [
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: [
          "2.0L Ingenium Petrol Mild-Hybrid",
          "2.0L Ingenium Diesel Mild-Hybrid",
        ],
      },
      {
        name: "Range Rover Velar",
        carr_life_span: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        engine: ["2.0L Ingenium Petrol", "2.0L Ingenium Diesel"],
      },
      {
        name: "Defender",
        carr_life_span: [2020, 2021, 2022, 2023, 2024, 2025],
        engine: [
          "2.0L Ingenium Petrol",
          "3.0L Ingenium Petrol Mild-Hybrid",
          "3.0L Ingenium Diesel Mild-Hybrid",
          "5.0L Supercharged V8 Petrol",
        ],
      },
      {
        name: "Range Rover Sport",
        carr_life_span: [
          2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
          2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ],
        engine: [
          "3.0L Ingenium Petrol Mild-Hybrid",
          "3.0L Ingenium Diesel Mild-Hybrid",
        ],
      },
      {
        name: "Range Rover",
        carr_life_span: [
          1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980,
          1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
          1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002,
          2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
          2025,
        ],
        engine: [
          "3.0L Ingenium Petrol Mild-Hybrid",
          "3.0L Ingenium Diesel Mild-Hybrid",
          "4.4L Twin-Turbo V8 Petrol",
        ],
      },
    ],
  };

  // Initialize makers on mount
  useEffect(() => {
    setMakers(Object.keys(carData));
  }, []);

  // Update models when maker changes
  useEffect(() => {
    if (selectedMaker) {
      const makerModels = carData[selectedMaker].map((model) => model.name);
      setModels(makerModels);
    } else {
      setModels([]);
    }
    // Reset dependent values
    setSelectedModel("");
    setSelectedYear("");
    setSelectedEngine("");
    setYears([]);
    setEngines([]);
  }, [selectedMaker]);

  // Update years and engines when model changes
  useEffect(() => {
    if (selectedMaker && selectedModel) {
      const selectedModelData = carData[selectedMaker].find(
        (model) => model.name === selectedModel
      );

      if (selectedModelData) {
        setYears(selectedModelData.carr_life_span);
        setEngines(selectedModelData.engine);
      }
    }
    // Reset dependent values
    setSelectedYear("");
    setSelectedEngine("");
  }, [selectedModel, selectedMaker]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEngine || !selectedYear) return;

    setLoading(true);
    setSearchPerformed(true);

    try {
      // Example filter - replace with your actual parts data
      const compatibleParts = mockParts.filter(
        (part) =>
          part.compatibleMakes.includes(selectedMaker) &&
          part.compatibleModels.includes(selectedModel) &&
          part.compatibleYears.includes(selectedYear) &&
          part.engineType === selectedEngine
      );

      setFoundParts(compatibleParts);
    } catch (error) {
      console.error("Error searching parts:", error);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Year Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
            disabled={!selectedModel}
            required
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
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
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={!selectedYear}
            required
          >
            <option value="">Select Engine</option>
            {engines.map((engine) => (
              <option key={engine} value={engine}>
                {engine}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="bg-primary hover:bg-secondary w-full text-white px-8 py-3 rounded-lg font-heading font-semibold transition-all"
          disabled={!selectedEngine || loading}
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
                      Compatible with: {part.compatibleMakes.join(", ")}{" "}
                      {part.compatibleModels.join(", ")} (
                      {part.compatibleYears.join(", ")})
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center text-gray-500">
              No compatible parts found for the selected vehicle.
            </div>
          )}
        </div>
      )}
    </form>
  );
}

// Example mock parts data - replace with your actual data
const mockParts: Part[] = [
  {
    id: "1",
    partNumber: "SWF-123",
    name: "Air Filter",
    price: 29.99,
    compatibleMakes: ["Maruti"],
    compatibleModels: ["Swift"],
    compatibleYears: [2024, 2025],
    engineType: "1.2L Z12E Petrol",
  },
];
