/*
 * @Date: 2023-04-25 10:01:20
 * @LastEditTime: 2023-04-25 14:15:56
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 行政区划数据
 */
import { CascaderOption, ProvinceProps } from "./index.d";
import _ from "lodash";
import { Street, City, Province, Area } from "@/api/china-division/index.d";
const streetMap: { [key: string]: CascaderOption[] } = {}; // 缓存乡镇数据
// 获取省市数据
const getProvinceCityOptions = (
  citiesCopy: ProvinceProps[],
  provinces: Province[]
): CascaderOption[] => {
  const provincesCopy = _.cloneDeep(provinces);
  citiesCopy.forEach((city: ProvinceProps) => {
    const province: { [key: string]: any } = provincesCopy.find(
      (province: ProvinceProps) => province.code === city.provinceCode
    );
    if (province) {
      const child: CascaderOption = {
        label: city.name,
        value: city.code,
        children: city.children,
      };
      province.children = province.children
        ? [...province.children, child]
        : [child];
    }
  });
  return provincesCopy.map((province: ProvinceProps) => ({
    label: province.name,
    value: province.code,
    children: province.children,
  }));
};
// 获取省市区数据
const getProvinceCityAreaOptions = (
  cities: City[],
  areas: Area[],
  provinces: Province[]
): CascaderOption[] => {
  const citiesCopy = _.cloneDeep(cities);
  areas.forEach(area => {
    const city: { [key: string]: any } = citiesCopy.find(
      city => city.code === area.cityCode
    );
    if (city) {
      const child: CascaderOption = {
        label: area.name,
        value: area.code,
      };
      city.children = city.children ? [...city.children, child] : [child];
    }
  });
  return getProvinceCityOptions(citiesCopy, provinces);
};

// 获取省市或省市区级联选择options数据
export const getCascaderOptions = (
  format: string,
  cities: City[],
  areas: Area[],
  provinces: Province[]
): CascaderOption[] => {
  return format !== "City"
    ? getProvinceCityAreaOptions(_.cloneDeep(cities), areas, provinces)
    : getProvinceCityOptions(_.cloneDeep(cities), provinces);
};
// 根据选择的省市区获取对应的乡镇
export const getTownOptions = (
  selectProvince: string[],
  streets: Street[]
): CascaderOption[] => {
  const [provinceCode, cityCode, areaCode] = selectProvince;
  if (streetMap[areaCode]) return streetMap.areaCode;
  streetMap[areaCode] = streets
    .filter(
      (item: ProvinceProps) =>
        item.provinceCode === provinceCode &&
        item.cityCode === cityCode &&
        item.areaCode === areaCode
    )
    .map((item: ProvinceProps) => ({ label: item.name, value: item.code }));
  return streetMap[areaCode];
};
