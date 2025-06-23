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
  compatibleEngineNames?: string[];
}

interface Engine {
  name: string;
  launchYear: number;
}

interface CarModel {
  name: string;
  carr_life_span: number[];
  engines: Engine[];
}

interface CarData {
  [key: string]: CarModel[];
}

export default function VehicleSearch() {
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedEngineName, setSelectedEngineName] = useState("");

  const [makers, setMakers] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [engines, setEngines] = useState<Engine[]>([]);

  const [loading, setLoading] = useState(false);
  const [foundParts, setFoundParts] = useState<Part[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
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

  useEffect(() => {
    setMakers(Object.keys(carData));
  }, []);

  // When maker changes, reset model/year/engine, set models
  useEffect(() => {
    if (selectedMaker && carData[selectedMaker]) {
      const makerModels = carData[selectedMaker].map((m) => m.name);
      setModels(makerModels);
    } else {
      setModels([]);
    }
    setSelectedModel("");
    setSelectedYear("");
    setYearOptions([]);
    setSelectedEngineName("");
    setEngines([]);
  }, [selectedMaker]);

  // When model changes, set yearOptions, reset year/engine
  useEffect(() => {
    if (selectedMaker && selectedModel) {
      const modelData = carData[selectedMaker].find(
        (m) => m.name === selectedModel
      );
      if (modelData) {
        setYearOptions(modelData.carr_life_span);
      } else {
        setYearOptions([]);
      }
    } else {
      setYearOptions([]);
    }
    setSelectedYear("");
    setSelectedEngineName("");
    setEngines([]);
  }, [selectedMaker, selectedModel]);

  // When year changes, filter engines
  useEffect(() => {
    if (selectedMaker && selectedModel && selectedYear !== "") {
      const modelData = carData[selectedMaker].find(
        (m) => m.name === selectedModel
      );
      if (modelData) {
        const filtered = modelData.engines.filter(
          (engine) => engine.launchYear <= selectedYear
        );
        setEngines(filtered);
      } else {
        setEngines([]);
      }
    } else {
      setEngines([]);
    }
    setSelectedEngineName("");
  }, [selectedMaker, selectedModel, selectedYear]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedMaker ||
      !selectedModel ||
      selectedYear === "" ||
      !selectedEngineName
    ) {
      // Optionally show a message to choose all fields
      return;
    }

    setLoading(true);
    setSearchPerformed(true);
    setFoundParts([]);

    try {
      const res = await fetch("/api/searchBarFilter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maker: selectedMaker,
          model: selectedModel,
          year: selectedYear,
          engineName: selectedEngineName,
        }),
      });
      if (!res.ok) {
        console.error("Server error:", res.statusText);
        setFoundParts([]);
      } else {
        const data: Part[] = await res.json();
        setFoundParts(data);
      }
    } catch (err) {
      console.error("Error calling API:", err);
      setFoundParts([]);
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
        {/* Make */}
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
            {makers.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        {/* Model */}
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
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        {/* Year */}
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
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        {/* Engine */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Engine
          </label>
          <select
            value={selectedEngineName}
            onChange={(e) => setSelectedEngineName(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={!selectedYear}
            required
          >
            <option value="">Select Engine</option>
            {engines.map((eng) => (
              <option key={eng.name} value={eng.name}>
                {eng.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          className="bg-primary hover:bg-secondary w-full text-white px-8 py-3 rounded-lg font-heading font-semibold transition-all"
          disabled={loading || !selectedEngineName}
        >
          {loading ? "Finding Parts..." : "Find Parts"}
        </button>
      </div>

      {/* Results */}
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
                    <strong>{part.name}</strong> ({part.partNumber}) - ₹
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
