import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/layout/HeroSection";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CareerTree from "../components/Pathfinder/CareerTree";
import { useNavigate } from "react-router-dom";
import NextPaths from "../components/careersNextPaths/NextPaths";

export default function CareersNextPaths() {

    const navigate = useNavigate();
    
    const { jobid } = useParams();

  return (
    <MainLayout>

        <NextPaths jobid={jobid}/>

    </MainLayout>
  );
}