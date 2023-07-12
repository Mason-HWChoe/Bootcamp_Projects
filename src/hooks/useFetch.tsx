import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface Item {
  contentId: number;
  facltNm: string;
  lineIntro: string;
  intro: string;
  allar: number;
  insrncAt: string;
  trsagntNo: string;
  bizrno: string;
  facltDivNm: string;
  mangeDivNm: string;
  mgcDiv: string;
  manageSttus: string;
  hvofBgnde: string;
  hvofEnddle: string;
  featureNm: string;
  induty: string;
  lctCl: string;
  doNm: string;
  sigunguNm: string;
  zipcode: string;
  addr1: string;
  addr2: string;
  mapX: string;
  mapY: string;
  direction: string;
  tel: string;
  homepage: string;
  resveUrl: string;
  resveCl: string;
  manageNmpr: number;
  gnrlSiteCo: number;
  autoSiteCo: number;
  glampSiteCo: number;
  caravSiteCo: number;
  indvdlCaravSiteCo: number;
  sitedStnc: number;
  siteMg1Width: number;
  siteMg2Width: number;
  siteMg3Width: number;
  siteMg1Vrticl: number;
  siteMg2Vrticl: number;
  siteMg3Vrticl: number;
  siteMg1Co: number;
  siteMg2Co: number;
  siteMg3Co: number;
  siteBottomCl1: number;
  siteBottomCl2: number;
  siteBottomCl3: number;
  siteBottomCl4: number;
  siteBottomCl5: number;
  tooltip: string;
  glampInnerFclty: string;
  caravInnerFclty: string;
  prmisnDe: string;
  operPdCl: string;
  operDeCl: string;
  trlerAcmpnyAt: string;
  caravAcmpnyAt: string;
  toiletCo: number;
  swrmCo: number;
  wtrplCo: number;
  brazierCl: string;
  sbrsCl: string;
  sbrsEtc: string;
  posblFcltyCl: string;
  posblFcltyEtc: string;
  clturEventAt: string;
  clturEvent: string;
  exprnProgrmAt: string;
  exprnProgrm: string;
  extshrCo: number;
  frprvtWrppCo: number;
  frprvtSandCo: number;
  fireSensorCo: number;
  themaEnvrnCl: string;
  eqpmnLendCl: string;
  animalCmgCl: string;
  tourEraCl: string;
  firstImageUrl: string;
  createdtime: string;
  modifiedtime: string;
}

export interface ApiResponse {
  response: {
    body: {
      totalCount: number;
      items: {
        item: Item[];
      };
    };
  };
}

export function useFetch(
  url: string,
  currentPage?: number,
  itemsPerPage?: number,
) {
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campingUrl = `${url}&numOfRows=${itemsPerPage}&pageNo=${currentPage}`;
        const response: AxiosResponse<ApiResponse> = await axios.get(
          campingUrl,
        );
        const { totalCount, items } = response.data.response.body;
        setData(items.item);
        setTotalCount(totalCount);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, currentPage, itemsPerPage]);

  return { data, isLoading, totalCount };
}
