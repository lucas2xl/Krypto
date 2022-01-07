import React from 'react';
import { BiSearchAlt, BsShieldFillCheck, RiHeart2Fill } from '../utils/icons';
import { ServiceCard } from './ServiceCard';

export const Services = () => {
  return (
    <div className="flex mf:flex-row flex-col w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col justify-between items-center md:p-10 py-12 px-4">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl text-gradient">
            Services that we <br />
            continue to improve
          </h1>
          <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
            The best choice for buying and selling your crypto assets, with the
            various super friendly services we offer
          </p>
        </div>
        <div className="flex flex-col justify-start items-center">
          <ServiceCard
            title="Security Guaranteed"
            subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            color="bg-[#2952E3]"
          />
          <ServiceCard
            title="Best exchange rates"
            subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            color="bg-[#8945F8]"
          />
          <ServiceCard
            title="Fastest transactions"
            subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            color="bg-[#F84550]"
          />
        </div>
      </div>
    </div>
  );
};
