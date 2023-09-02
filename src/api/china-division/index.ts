/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-16 15:38:21
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-16 16:54:24
 * @Description:
 */
import { useQueries } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Area, City, Province, Street } from "./index.d";

export const PROVINCES =
  window.location.origin + "/lib/china-division/provinces.json";
export const CITIES =
  window.location.origin + "/lib/china-division/cities.json";
export const AREAS = window.location.origin + "/lib/china-division/areas.json";
export const STREETS =
  window.location.origin + "/lib/china-division/streets.json";

export const useProvinces = () => {
  const [state, setState] = useState<Province[]>([]);

  useEffect(() => {
    fetch(PROVINCES)
      .then(response => response.json())
      .then(res => setState(res));
  }, []);

  return state;
};

export const useCities = () => {
  const [state, setState] = useState<City[]>([]);

  useEffect(() => {
    fetch(CITIES)
      .then(response => response.json())
      .then(res => setState(res));
  }, []);

  return state;
};

export const useAreas = () => {
  const [state, setState] = useState<Area[]>([]);

  useEffect(() => {
    fetch(AREAS)
      .then(response => response.json())
      .then(res => setState(res));
  }, []);

  return state;
};
export const useStreets = () => {
  const [state, setState] = useState<Street[]>([]);

  useEffect(() => {
    fetch(STREETS)
      .then(response => response.json())
      .then(res => setState(res));
  }, []);

  return state;
};

export const useChinaDivision = () => {
  return useQueries({
    queries: [
      {
        queryKey: ["province"],
        queryFn: () => fetch(CITIES).then(response => response.json()),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["city"],
        queryFn: () => fetch(CITIES).then(response => response.json()),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["area"],
        queryFn: () => fetch(AREAS).then(response => response.json()),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["street"],
        queryFn: () => fetch(STREETS).then(response => response.json()),
        refetchOnWindowFocus: false,
      },
    ],
  });
};
