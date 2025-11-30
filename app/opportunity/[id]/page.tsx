"use client";

import { useState, use, useRef } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mockOpportunities } from "@/lib/opportunities";
import type { OpportunityDetailData } from "@/lib/opportunity-detail-types";

import {
  HeroSection,
  ImageCarousel,
  StorySection,
  HowItWorksSection,
  TractionSection,
  TeamSection,
  AskQuestionsSection,
  FloatingInvestCTA,
  CompanyMetricsCard,
  MyPositionCard,
  OnChainCapTableSection,
} from "@/components/sections/opportunity";

const companyMetadata: Record<
  string,
  { website: string; founded: number; employees: string; headquarters: string }
> = {
  "1": {
    website: "https://skymed.de",
    founded: 2022,
    employees: "25-50",
    headquarters: "Munich, Germany",
  },
  "2": {
    website: "https://greengrid.energy",
    founded: 2021,
    employees: "15-25",
    headquarters: "Amsterdam, Netherlands",
  },
  "3": {
    website: "https://farmsense.io",
    founded: 2020,
    employees: "20-30",
    headquarters: "Lyon, France",
  },
  "4": {
    website: "https://secureid-labs.eu",
    founded: 2019,
    employees: "30-50",
    headquarters: "Vienna, Austria",
  },
  "5": {
    website: "https://medibot.health",
    founded: 2021,
    employees: "15-20",
    headquarters: "Seville, Spain",
  },
  "6": {
    website: "https://circularpack.com",
    founded: 2020,
    employees: "40-60",
    headquarters: "Rotterdam, Netherlands",
  },
  "7": {
    website: "https://mistral.ai",
    founded: 2023,
    employees: "50-100",
    headquarters: "Paris, France",
  },
  "8": {
    website: "https://eduflow.se",
    founded: 2022,
    employees: "20-30",
    headquarters: "Stockholm, Sweden",
  },
  "9": {
    website: "https://proptech.dk",
    founded: 2020,
    employees: "35-50",
    headquarters: "Copenhagen, Denmark",
  },
  "10": {
    website: "https://foodwaste.ai",
    founded: 2023,
    employees: "15-20",
    headquarters: "Milan, Italy",
  },
  "11": {
    website: "https://mobilityhub.nl",
    founded: 2021,
    employees: "40-60",
    headquarters: "Amsterdam, Netherlands",
  },
  "12": {
    website: "https://carbonledger.de",
    founded: 2021,
    employees: "25-40",
    headquarters: "Berlin, Germany",
  },
  "13": {
    website: "https://biopharm.ch",
    founded: 2019,
    employees: "60-80",
    headquarters: "Zurich, Switzerland",
  },
  "14": {
    website: "https://quantumsecure.fi",
    founded: 2022,
    employees: "18-25",
    headquarters: "Helsinki, Finland",
  },
  "15": {
    website: "https://agridata.pl",
    founded: 2023,
    employees: "12-18",
    headquarters: "Warsaw, Poland",
  },
  "16": {
    website: "https://finflow.pt",
    founded: 2020,
    employees: "30-45",
    headquarters: "Lisbon, Portugal",
  },
  "17": {
    website: "https://healthmonitor.ie",
    founded: 2021,
    employees: "22-35",
    headquarters: "Dublin, Ireland",
  },
  "18": {
    website: "https://windopt.dk",
    founded: 2020,
    employees: "28-40",
    headquarters: "Aarhus, Denmark",
  },
  "19": {
    website: "https://blockchainpay.ee",
    founded: 2023,
    employees: "14-20",
    headquarters: "Tallinn, Estonia",
  },
  "20": {
    website: "https://robocare.nl",
    founded: 2022,
    employees: "20-30",
    headquarters: "Eindhoven, Netherlands",
  },
  "21": {
    website: "https://watersense.es",
    founded: 2021,
    employees: "25-35",
    headquarters: "Barcelona, Spain",
  },
  "22": {
    website: "https://learnai.co.uk",
    founded: 2022,
    employees: "18-28",
    headquarters: "London, United Kingdom",
  },
  "23": {
    website: "https://smartgrid.eu",
    founded: 2019,
    employees: "55-75",
    headquarters: "Munich, Germany",
  },
  "24": {
    website: "https://medsupply.be",
    founded: 2023,
    employees: "10-15",
    headquarters: "Brussels, Belgium",
  },
  "25": {
    website: "https://insurtechpro.fr",
    founded: 2020,
    employees: "32-48",
    headquarters: "Lyon, France",
  },
  "26": {
    website: "https://agrirobotics.nl",
    founded: 2021,
    employees: "24-36",
    headquarters: "Wageningen, Netherlands",
  },
  "27": {
    website: "https://deepcode.ai",
    founded: 2020,
    employees: "38-55",
    headquarters: "Prague, Czech Republic",
  },
  "28": {
    website: "https://recycleai.se",
    founded: 2023,
    employees: "16-22",
    headquarters: "Gothenburg, Sweden",
  },
  "29": {
    website: "https://telehealth.gr",
    founded: 2022,
    employees: "19-28",
    headquarters: "Athens, Greece",
  },
  "30": {
    website: "https://neuralink.eu",
    founded: 2021,
    employees: "42-60",
    headquarters: "Lausanne, Switzerland",
  },
};

const companyImages: Record<string, { src: string; caption: string }[]> = {
  "1": [
    {
      src: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=675&fit=crop",
      caption:
        "Our autonomous drone fleet ready for daily medical deliveries across rural Bavaria",
    },
    {
      src: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=1200&h=675&fit=crop",
      caption: "Precision landing at a partner pharmacy in the countryside",
    },
    {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=675&fit=crop",
      caption: "Our operations center monitoring real-time delivery routes",
    },
    {
      src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=675&fit=crop",
      caption:
        "Temperature-controlled medical cargo compartment ensures safe transport",
    },
  ],
  "2": [
    {
      src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=675&fit=crop",
      caption:
        "Solar installations managed by our AI platform across the Benelux region",
    },
    {
      src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=675&fit=crop",
      caption: "Real-time energy optimization dashboard for our SME clients",
    },
    {
      src: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&h=675&fit=crop",
      caption: "One of 340+ installations achieving carbon neutrality",
    },
  ],
  "3": [
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=675&fit=crop",
      caption: "IoT sensors monitoring crop health across 1,200 hectares",
    },
    {
      src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=675&fit=crop",
      caption: "Precision irrigation based on real-time soil moisture data",
    },
    {
      src: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&h=675&fit=crop",
      caption: "Farmers using our mobile app to track field conditions",
    },
  ],
  "4": [
    {
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=675&fit=crop",
      caption:
        "Secure blockchain infrastructure powering identity verification",
    },
    {
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=675&fit=crop",
      caption: "Our engineering team building the future of digital identity",
    },
    {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=675&fit=crop",
      caption: "Decentralized KYC processing thousands of verifications daily",
    },
  ],
  "5": [
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=675&fit=crop",
      caption: "AI-powered diagnostic tools in action at a rural clinic",
    },
    {
      src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1200&h=675&fit=crop",
      caption: "Training session with healthcare workers in Andalusia",
    },
    {
      src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1200&h=675&fit=crop",
      caption: "Our platform achieving 94% diagnostic accuracy",
    },
  ],
  "6": [
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop",
      caption: "Reusable packaging ready for deployment to e-commerce partners",
    },
    {
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=675&fit=crop",
      caption: "Our circular economy model in action at Zalando fulfillment",
    },
    {
      src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=675&fit=crop",
      caption: "Over 2 million single-use boxes eliminated and counting",
    },
  ],
  "7": [
    {
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop",
      caption: "Our team developing next-generation AI models in Paris",
    },
    {
      src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=675&fit=crop",
      caption: "Training infrastructure powering Mistral's open-weight models",
    },
    {
      src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=675&fit=crop",
      caption: "Collaborative AI research advancing European sovereignty",
    },
  ],
  "8": [
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop",
      caption:
        "Students using EduFlow's personalized learning platform in Swedish classrooms",
    },
    {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=675&fit=crop",
      caption: "AI-powered adaptive learning paths improving student outcomes",
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=675&fit=crop",
      caption: "Real-time progress tracking across 180 schools in the Nordics",
    },
  ],
  "9": [
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop",
      caption:
        "Smart building management system controlling energy consumption",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop",
      caption: "IoT sensors monitoring building performance in real-time",
    },
    {
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=675&fit=crop",
      caption: "Energy savings dashboard for commercial property managers",
    },
  ],
  "10": [
    {
      src: "https://images.unsplash.com/photo-1556910103-2c027eb7e2cf?w=1200&h=675&fit=crop",
      caption: "AI analyzing food waste patterns in restaurant kitchens",
    },
    {
      src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=675&fit=crop",
      caption: "Predictive analytics preventing food waste before it happens",
    },
    {
      src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=675&fit=crop",
      caption:
        "Restaurant partners reducing waste by 45% across Italy and Spain",
    },
  ],
  "11": [
    {
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=675&fit=crop",
      caption:
        "Unified mobility app connecting all transport modes in Dutch cities",
    },
    {
      src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=675&fit=crop",
      caption: "Seamless integration of public transit, bikes, and scooters",
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop",
      caption: "85,000 active users navigating cities more efficiently",
    },
  ],
  "12": [
    {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&fit=crop",
      caption: "AI-powered carbon accounting dashboard for enterprises",
    },
    {
      src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=675&fit=crop",
      caption: "Automated emission tracking across global supply chains",
    },
    {
      src: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&h=675&fit=crop",
      caption: "Serving major European enterprises including Siemens and BASF",
    },
  ],
  "13": [
    {
      src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=675&fit=crop",
      caption: "State-of-the-art biopharmaceutical manufacturing facility",
    },
    {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=675&fit=crop",
      caption: "Novel production process reducing costs by 50%",
    },
    {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=675&fit=crop",
      caption:
        "Partnerships with Novartis and Roche advancing European biotech",
    },
  ],
  "14": [
    {
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=675&fit=crop",
      caption:
        "Quantum-resistant encryption protecting critical infrastructure",
    },
    {
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=675&fit=crop",
      caption: "Post-quantum cryptography research and development",
    },
    {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=675&fit=crop",
      caption: "Securing 12 critical infrastructure projects across Finland",
    },
  ],
  "15": [
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=675&fit=crop",
      caption: "Predictive analytics optimizing crop yields in Polish farms",
    },
    {
      src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=675&fit=crop",
      caption: "Machine learning models predicting optimal planting strategies",
    },
    {
      src: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&h=675&fit=crop",
      caption: "Piloted across 800 hectares with promising early results",
    },
  ],
  "16": [
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
      caption: "AI-powered bookkeeping saving 10 hours per week for SMEs",
    },
    {
      src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop",
      caption: "Automated accounting platform for small businesses",
    },
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
      caption: "Serving 2,400+ businesses across Portugal and Spain",
    },
  ],
  "17": [
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=675&fit=crop",
      caption: "Remote patient monitoring devices tracking chronic conditions",
    },
    {
      src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1200&h=675&fit=crop",
      caption: "Wearable technology monitoring 1,200+ patients",
    },
    {
      src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1200&h=675&fit=crop",
      caption: "Reducing hospitalizations by 35% through proactive care",
    },
  ],
  "18": [
    {
      src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=675&fit=crop",
      caption:
        "AI optimizing wind turbine performance across Danish wind farms",
    },
    {
      src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=675&fit=crop",
      caption: "Machine learning increasing energy output by 18%",
    },
    {
      src: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&h=675&fit=crop",
      caption: "Managing 12 wind farms with real-time optimization",
    },
  ],
  "19": [
    {
      src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=675&fit=crop",
      caption: "Cryptocurrency payment infrastructure for European merchants",
    },
    {
      src: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&h=675&fit=crop",
      caption: "Seamless crypto-to-fiat conversion platform",
    },
    {
      src: "https://images.unsplash.com/photo-1639322537504-6427a16b0a73?w=1200&h=675&fit=crop",
      caption: "Integrated with 180+ online stores across the Baltics",
    },
  ],
  "20": [
    {
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=675&fit=crop",
      caption: "Assistive robots supporting elderly care in Dutch facilities",
    },
    {
      src: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=675&fit=crop",
      caption: "Social robots assisting with daily tasks and companionship",
    },
    {
      src: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=675&fit=crop",
      caption:
        "Deployed in 28 care facilities reducing caregiver workload by 25%",
    },
  ],
  "21": [
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop",
      caption: "IoT sensors monitoring water systems in Spanish municipalities",
    },
    {
      src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=675&fit=crop",
      caption: "AI reducing water loss by 28% in municipal systems",
    },
    {
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=675&fit=crop",
      caption:
        "Deployed in 15 cities across Spain conserving millions of liters",
    },
  ],
  "22": [
    {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=675&fit=crop",
      caption: "AI tutoring platform supporting university students 24/7",
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop",
      caption: "Personalized learning support for STEM subjects",
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=675&fit=crop",
      caption: "8,500+ active students across 12 European universities",
    },
  ],
  "23": [
    {
      src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=675&fit=crop",
      caption:
        "Intelligent grid management enabling renewable energy integration",
    },
    {
      src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=675&fit=crop",
      caption: "AI-powered grid balancing for regional operators",
    },
    {
      src: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&h=675&fit=crop",
      caption: "Serving 8 regional grid operators across Germany",
    },
  ],
  "24": [
    {
      src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=675&fit=crop",
      caption: "Blockchain tracking pharmaceutical supply chains",
    },
    {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=675&fit=crop",
      caption: "Immutable records preventing counterfeit drugs",
    },
    {
      src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=675&fit=crop",
      caption: "Piloted with 3 major pharmaceutical distributors",
    },
  ],
  "25": [
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
      caption: "AI-powered insurance underwriting platform",
    },
    {
      src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop",
      caption:
        "Machine learning reducing underwriting time from days to minutes",
    },
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
      caption: "Serving 12 insurance companies across France",
    },
  ],
  "26": [
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=675&fit=crop",
      caption: "Autonomous robots performing precision farming tasks",
    },
    {
      src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=675&fit=crop",
      caption: "Robotic weeding and harvesting across Dutch farms",
    },
    {
      src: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&h=675&fit=crop",
      caption: "Deployed across 600 hectares with impressive results",
    },
  ],
  "27": [
    {
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=675&fit=crop",
      caption: "AI-powered code review detecting bugs and vulnerabilities",
    },
    {
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=675&fit=crop",
      caption: "Real-time security scanning for development teams",
    },
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop",
      caption: "Used by 450+ development teams across Europe",
    },
  ],
  "28": [
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop",
      caption: "AI-powered waste sorting with 95% accuracy",
    },
    {
      src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=675&fit=crop",
      caption: "Computer vision optimizing recycling processes",
    },
    {
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=675&fit=crop",
      caption: "Deployed in 25 recycling facilities across Sweden",
    },
  ],
  "29": [
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=675&fit=crop",
      caption:
        "Virtual healthcare consultations connecting patients with specialists",
    },
    {
      src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1200&h=675&fit=crop",
      caption: "Telemedicine platform expanding healthcare access",
    },
    {
      src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1200&h=675&fit=crop",
      caption: "3,200+ consultations completed across Greece and Cyprus",
    },
  ],
  "30": [
    {
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=675&fit=crop",
      caption: "Brain-computer interface technology for medical applications",
    },
    {
      src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=675&fit=crop",
      caption: "Non-invasive BCI helping paralyzed patients control devices",
    },
    {
      src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=675&fit=crop",
      caption: "Clinical trials with 45 patients showing 78% success rate",
    },
  ],
};

const companyStories: Record<string, string> = {
  "1": "In the quiet villages of rural Bavaria, elderly patients often wait days for essential medications. Dr. Maria Hoffmann witnessed this firsthand during her years at DHL—watching delivery vans struggle on narrow roads while patients went without. In 2022, she partnered with autonomous systems expert Thomas Weber to build SkyMed: a network of medical drones that bypass traffic entirely. Today, their fleet serves 127 pharmacies across Germany, delivering prescriptions in under 15 minutes. The goal isn't just faster delivery—it's ensuring no patient in rural Europe goes without the medicine they need.",
  "2": "GreenGrid Energy was born from a simple observation: small businesses across Europe were paying too much for energy while solar technology sat unused. Founder Lars van der Berg, a former energy consultant, saw that SMEs lacked the expertise to optimize their solar installations. In 2021, he built an AI platform that automatically adjusts solar panel networks based on weather, demand, and grid prices. Today, GreenGrid manages 340 installations across Benelux, reducing energy costs by an average of 40% while helping businesses achieve carbon neutrality.",
  "3": "Marie Dubois grew up on a farm in rural France, watching her family struggle with unpredictable weather and rising water costs. After studying agricultural engineering, she realized that precision sensors could transform farming. In 2020, she co-founded FarmSense to bring IoT technology to European farmers. Their sensors monitor soil moisture, nutrient levels, and crop health in real-time, reducing water usage by 35% while increasing yields. Today, FarmSense sensors cover 1,200 hectares across France, helping farmers grow more with less.",
  "4": "Thomas Weber spent years watching banks struggle with identity verification—slow processes, high costs, and privacy concerns. As a cybersecurity researcher, he knew there had to be a better way. In 2019, he founded SecureID Labs to build decentralized identity verification using blockchain technology. Their platform reduces KYC costs by 60% while giving users control over their data. Today, SecureID is integrated with Erste Bank and N26, processing thousands of verifications daily across Europe.",
  "5": "Dr. Carlos Ruiz worked in rural clinics across Andalusia for over a decade, seeing firsthand how limited resources affected patient care. When AI diagnostic tools became available, he realized they could bridge the gap between rural clinics and urban medical centers. In 2021, he founded MediBot to bring AI-powered diagnostics to underserved areas. Today, MediBot supports 45 clinics across Andalusia with 94% diagnostic accuracy, ensuring rural patients receive the same quality care as those in cities.",
  "6": "Sophie Janssen was frustrated by the mountains of cardboard boxes piling up from her online shopping. As a logistics engineer, she knew there had to be a better way. In 2020, she designed a reusable packaging system that could be returned, cleaned, and reused hundreds of times. Today, CircularPack has eliminated over 2 million single-use boxes through partnerships with Zalando and Coolblue, creating a circular economy for e-commerce packaging.",
  "7": "When Arthur Mensch, Timothée Lacroix, and Guillaume Lample left Meta AI and Google DeepMind in 2023, they shared a vision: Europe deserved its own world-class AI lab. Within months, Mistral AI raised €385M—the largest seed round in European history. Their open-weight models—Mistral 7B, Mixtral 8x7B, and the flagship Mistral Large—now rival GPT-4 while costing 5x less to run. With partnerships spanning Microsoft Azure, IBM watsonx, and multiple EU governments, Mistral isn't just building AI models—they're building European AI independence.",
  "8": "Erik Andersson spent years as a teacher in Stockholm, watching students struggle with one-size-fits-all curricula. In 2022, he co-founded EduFlow to bring personalized learning to Nordic schools. Their AI platform adapts to each student's learning style, providing customized content and real-time feedback. Today, EduFlow is active in 180 schools across Sweden and Norway, improving test scores by an average of 28% while reducing teacher workload.",
  "9": "Lars Nielsen saw the energy waste in commercial buildings during his years as a facilities manager. In 2020, he founded PropTech Solutions to bring smart building automation to Scandinavian real estate. Their IoT platform monitors and optimizes everything from heating to lighting, reducing energy consumption by 32%. Today, PropTech manages 450+ properties across Denmark, helping building owners save money while reducing their carbon footprint.",
  "10": "Marco Rossi worked in restaurant kitchens across Italy for over a decade, watching perfectly good food get thrown away. In 2023, he co-founded FoodWaste AI to solve this problem with technology. Their predictive analytics platform forecasts demand and optimizes inventory, reducing food waste by 45%. Today, FoodWaste AI is deployed in 320 restaurants across Italy and Spain, saving thousands of kilograms of food from landfills every month.",
  "11": "Emma van der Berg was frustrated by the complexity of urban transportation—different apps, different tickets, different systems. In 2021, she founded MobilityHub to unify all transport modes into a single platform. Their app integrates trains, buses, bikes, and scooters, making it easy for users to plan and pay for multi-modal journeys. Today, MobilityHub has 85,000 active users across Amsterdam, Rotterdam, and Utrecht, making urban mobility seamless.",
  "12": "Anna Schmidt watched European enterprises struggle with carbon accounting—manual processes, incomplete data, and regulatory complexity. In 2021, she co-founded CarbonLedger to automate the entire process. Their AI platform automatically tracks emissions across supply chains, generating compliant reports in minutes instead of weeks. Today, CarbonLedger serves 45+ enterprises including Siemens and BASF, helping them meet their sustainability goals.",
  "13": "Dr. Sophie Müller spent years in pharmaceutical research, seeing how expensive biopharmaceutical manufacturing limited access to life-saving drugs. In 2019, she co-founded BioPharm Innovations to revolutionize the production process. Their novel manufacturing technology reduces costs by 50% while maintaining quality. Today, BioPharm has partnerships with Novartis and Roche, bringing affordable biopharmaceuticals to European markets.",
  "14": "Jukka Virtanen understood the quantum threat to cybersecurity during his PhD research in Helsinki. In 2022, he founded QuantumSecure to protect critical infrastructure from future quantum attacks. Their post-quantum cryptography solutions are already deployed in 12 critical infrastructure projects across Finland, ensuring that Europe's essential systems remain secure as quantum computing advances.",
  "15": "Katarzyna Nowak grew up on a farm in rural Poland, watching her family struggle with unpredictable yields. After studying agricultural data science, she realized that predictive analytics could transform farming. In 2023, she co-founded AgriData Analytics to bring machine learning to European agriculture. Their models predict optimal planting times and crop selection, helping farmers maximize yields while minimizing inputs.",
  "16": "João Silva ran a small business in Lisbon, spending hours every week on bookkeeping. In 2020, he founded FinFlow to automate accounting for SMEs like his own. Their AI platform handles everything from invoice processing to tax preparation, saving small business owners 10 hours per week. Today, FinFlow serves 2,400+ businesses across Portugal and Spain, giving them more time to focus on growth.",
  "17": "Dr. Sarah O'Brien worked in Irish hospitals, seeing how chronic disease management overwhelmed the healthcare system. In 2021, she co-founded HealthMonitor Pro to bring remote monitoring to patients' homes. Their wearable devices and AI platform track vital signs continuously, alerting healthcare providers to issues before they become emergencies. Today, HealthMonitor Pro is monitoring 1,200+ patients, reducing hospitalizations by 35%.",
  "18": "Mads Hansen spent years working in Denmark's wind energy sector, seeing how suboptimal operations reduced energy output. In 2020, he co-founded WindOpt AI to optimize wind farm performance with machine learning. Their AI platform adjusts turbine operations in real-time based on weather patterns and grid demand, increasing energy output by 18%. Today, WindOpt manages 12 wind farms across Denmark, maximizing renewable energy generation.",
  "19": "Marten Kask saw the potential of cryptocurrency payments during the crypto boom, but recognized that merchants needed seamless conversion to fiat. In 2023, he co-founded BlockchainPay to bridge this gap. Their platform handles crypto-to-fiat conversion automatically, making it easy for merchants to accept cryptocurrency payments. Today, BlockchainPay is integrated with 180+ online stores across the Baltics, bringing crypto payments to mainstream commerce.",
  "20": "Dr. Pieter de Vries witnessed the challenges of elderly care during visits to his grandmother's care facility. In 2022, he co-founded RoboCare to bring assistive robots to care facilities. Their social robots help with daily tasks, provide companionship, and monitor residents' well-being. Today, RoboCare robots are deployed in 28 facilities across the Netherlands, reducing caregiver workload by 25% while improving residents' quality of life.",
  "21": "Carmen García saw water scarcity becoming a critical issue in Spanish cities. In 2021, she founded WaterSense to help municipalities conserve water through smart technology. Their IoT sensors monitor water systems in real-time, detecting leaks and optimizing distribution. Today, WaterSense is deployed in 15 cities across Spain, reducing water loss by 28% and conserving millions of liters annually.",
  "22": "James Mitchell struggled with university-level mathematics, watching classmates get help from tutors he couldn't afford. In 2022, he co-founded LearnAI to bring affordable AI tutoring to all students. Their platform provides 24/7 support for STEM subjects, adapting to each student's learning pace. Today, LearnAI has 8,500+ active students across 12 European universities, democratizing access to quality tutoring.",
  "23": "Dr. Klaus Fischer understood that Europe's energy transition required a smarter grid. In 2019, he co-founded SmartGrid EU to modernize grid infrastructure with AI. Their platform balances supply and demand in real-time, enabling higher integration of renewable energy sources. Today, SmartGrid EU serves 8 regional grid operators across Germany, helping them integrate 40% renewable energy while maintaining grid stability.",
  "24": "Luc De Vries saw the threat of counterfeit drugs in European supply chains. In 2023, he founded MedSupply Chain to bring blockchain tracking to pharmaceuticals. Their immutable records track every step from manufacturer to patient, preventing counterfeits and ensuring authenticity. Today, MedSupply Chain is piloted with 3 major pharmaceutical distributors, protecting patients across Europe.",
  "25": "Sophie Martin worked in insurance, watching underwriters spend days on each application. In 2020, she co-founded InsurTech Pro to automate underwriting with AI. Their machine learning models analyze risk in minutes instead of days, making insurance more accessible and affordable. Today, InsurTech Pro serves 12 insurance companies across France, revolutionizing the underwriting process.",
  "26": "Willem Bakker grew up on a Dutch farm, seeing how labor shortages affected agriculture. In 2021, he co-founded AgriRobotics to bring autonomous robots to farming. Their robots perform precision tasks like weeding and harvesting, working 24/7 without fatigue. Today, AgriRobotics robots are deployed across 600 hectares of Dutch farms, helping farmers maintain productivity despite labor challenges.",
  "27": "Tomáš Novák spent years as a software engineer, watching bugs slip through code reviews. In 2020, he co-founded DeepCode AI to bring AI-powered code review to development teams. Their platform analyzes code in real-time, detecting bugs and security vulnerabilities before they reach production. Today, DeepCode AI is used by 450+ development teams across Europe, improving code quality and security.",
  "28": "Elin Larsson was frustrated by low recycling rates in Swedish facilities. In 2023, she co-founded RecycleAI to optimize waste sorting with computer vision. Their AI system identifies and sorts waste with 95% accuracy, maximizing recycling rates and reducing contamination. Today, RecycleAI is deployed in 25 recycling facilities across Sweden, helping the country move closer to its zero-waste goals.",
  "29": "Dr. Maria Papadopoulos saw how geography limited healthcare access in Greece, especially for rural patients. In 2022, she co-founded TeleHealth Connect to bring virtual consultations to underserved areas. Their platform connects patients with specialists via video, eliminating travel barriers. Today, TeleHealth Connect has completed 3,200+ consultations across Greece and Cyprus, expanding healthcare access across the region.",
  "30": "Dr. Andreas Müller spent years researching brain-computer interfaces, seeing their potential to help paralyzed patients. In 2021, he co-founded NeuralLink EU to bring non-invasive BCI technology to medical applications. Their system allows patients to control devices using only their thoughts, restoring independence to those with severe mobility limitations. Today, NeuralLink EU is conducting clinical trials with 45 patients, showing a 78% success rate in device control.",
};

function transformToDetailData(
  opp: (typeof mockOpportunities)[0]
): OpportunityDetailData {
  const valuationNum = parseInt(opp.valuation.replace(/[€M]/g, "")) * 1000000;
  const pricePerShare = opp.sharePrice;
  const totalShares = Math.floor(valuationNum / pricePerShare);

  return {
    id: opp.id,
    company: {
      name: opp.name,
      tagline: opp.tagline,
      euDomiciled: opp.euDomiciled,
      audited: opp.audited,
      leadInvestor: opp.leadInvestor || "Index Ventures",
      images: companyImages[opp.id] || [],
      website: companyMetadata[opp.id]?.website,
      founded: companyMetadata[opp.id]?.founded,
      employees: companyMetadata[opp.id]?.employees,
      headquarters: companyMetadata[opp.id]?.headquarters,
      sector: opp.sector,
      stage: opp.stage,
    },
    pitch: {
      videoThumbnail: "/placeholder.svg",
      eli5Points: [
        opp.businessHook ||
          `${opp.name} solves a critical problem in ${opp.sector}`,
        `The company has proven traction with ${opp.fundingProgress}% of funding raised`,
        `With ${opp.runwayMonths} months runway, they're positioned for growth`,
      ],
      traction: [
        { label: "Active Pharmacies", value: "127" },
        { label: "Monthly Deliveries", value: "8.2k" },
        { label: "Revenue Run Rate", value: "€1.4M" },
        { label: "Patient Waitlist", value: "12k" },
      ],
    },
    analysis: {
      bullCase: [
        `Strong market position in ${opp.sector} with growing demand`,
        `Proven traction with ${opp.fundingProgress}% funding progress`,
        opp.leadInvestor
          ? `Backed by ${opp.leadInvestor}, a reputable investor`
          : "Experienced founding team",
        `EU domiciled and ${
          opp.audited ? "audited" : "transparent"
        } operations`,
      ],
      bearCase: [
        `Early stage (${opp.stage}) with limited operating history`,
        `Runway of ${opp.runwayMonths} months requires successful fundraising`,
        `Competitive landscape in ${opp.sector} may intensify`,
        opp.audited ? "" : "Limited financial transparency - not yet audited",
      ].filter(Boolean),
    },
    deal: {
      assetType: "DIGITAL SHARE",
      pricePerShare,
      currency: "€",
      valuation: opp.valuation,
      timeline: [
        { label: "Invest", date: "Today", active: true },
        { label: "Lock Period", date: "Year 1", active: false },
        { label: "Secondary Market", date: "Year 3", active: false },
        { label: "Target Exit", date: "Year 5-7", active: false },
      ],
      runwayMonths: opp.runwayMonths,
      runwayExtension: Math.floor(opp.runwayMonths * 3),
      votingPremium: opp.votingPremium,
      votingPremiumType: opp.votingPremiumType,
    },
    team: {
      members: [
        {
          name: opp.founderName || "Founder Name",
          role: opp.founderTitle || "CEO & Founder",
          background: `Previously at leading ${opp.sector} companies. ${
            opp.impactHeadline ||
            "Passionate about solving real-world problems."
          }`,
        },
        {
          name: "Thomas Weber",
          role: "CTO & Co-Founder",
          background: "Ex-Siemens Mobility, PhD in Autonomous Systems",
        },
        {
          name: "Lisa Chen",
          role: "COO",
          background: "Ex-McKinsey, Built ops for 3 logistics startups",
        },
        {
          name: "Prof. Klaus Richter",
          role: "Board Advisor",
          background: "Chair of Aviation Law, TU Munich",
        },
      ],
      founderOwnership: 58,
    },
    investment: {
      minInvestment: opp.minInvestment,
      maxInvestment: 10000,
      pricePerShare,
      totalShares,
      currency: "€",
    },
    priceHistory: opp.priceHistory,
  };
}

export default function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const opportunity = mockOpportunities.find((opp) => opp.id === id);

  if (!opportunity) {
    notFound();
  }

  const data = transformToDetailData(opportunity);

  const [question, setQuestion] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState(
    data.investment.minInvestment
  );

  const tractionRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const sharesFromInvestment = Math.floor(
    investmentAmount / data.investment.pricePerShare
  );
  const ownershipPercentage = (
    (sharesFromInvestment / data.investment.totalShares) *
    100
  ).toFixed(4);

  const companyStory =
    companyStories[data.id] ||
    `${
      data.company.name
    } is building the future of ${data.company.tagline.toLowerCase()}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection data={data} rawPriceHistory={data.priceHistory} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div>
            <StorySection story={companyStory} />

            {data.company.images && data.company.images.length > 0 && (
              <ImageCarousel
                images={data.company.images}
                companyName={data.company.name}
              />
            )}

            <HowItWorksSection points={data.pitch.eli5Points} />

            <div ref={tractionRef}>
              <TractionSection items={data.pitch.traction} />
            </div>

            <TeamSection
              members={data.team.members}
              founderOwnership={data.team.founderOwnership}
              companyName={data.company.name}
            />

            {/* On-Chain Cap Table - only shown if linked to blockchain */}
            {opportunity.startupId !== undefined && (
              <OnChainCapTableSection
                startupId={opportunity.startupId}
                companyName={data.company.name}
              />
            )}

            <AskQuestionsSection
              companyName={data.company.name}
              question={question}
              onQuestionChange={setQuestion}
              opportunityContext={{
                tagline: data.company.tagline,
                sector: data.company.sector,
                stage: data.company.stage,
                valuation: data.deal.valuation,
                story: companyStory,
                eli5Points: data.pitch.eli5Points,
                traction: data.pitch.traction,
                bullCase: data.analysis.bullCase,
                bearCase: data.analysis.bearCase,
                teamMembers: data.team.members,
              }}
            />
          </div>

          {/* Sidebar Column */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <CompanyMetricsCard
                valuation={data.deal.valuation}
                runwayMonths={data.deal.runwayMonths}
                stage={opportunity.stage}
                sector={opportunity.sector}
                totalShares={data.investment.totalShares}
                companyName={data.company.name}
                founderOwnership={data.team.founderOwnership}
              />

              <MyPositionCard
                sharesOwned={sharesFromInvestment}
                pricePerShare={data.investment.pricePerShare}
                ownershipPercentage={ownershipPercentage}
                currency={data.investment.currency}
                companyName={data.company.name}
              />
            </div>
          </div>
        </div>
      </div>

      <FloatingInvestCTA
        investmentAmount={investmentAmount}
        onInvestmentChange={setInvestmentAmount}
        ownershipPercentage={ownershipPercentage}
        sharesFromInvestment={sharesFromInvestment}
        pricePerShare={data.investment.pricePerShare}
        currency={data.investment.currency}
        minInvestment={data.investment.minInvestment}
        maxInvestment={data.investment.maxInvestment}
        triggerRef={tractionRef}
        hideRef={calculatorRef}
        companyName={data.company.name}
        votingPremium={data.deal.votingPremium}
        votingPremiumType={data.deal.votingPremiumType}
        totalShares={data.investment.totalShares}
      />

      <Footer />
    </div>
  );
}
