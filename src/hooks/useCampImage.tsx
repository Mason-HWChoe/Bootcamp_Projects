import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface ImageData {
  contentId: string;
  serialnum: string;
  imageUrl: string;
  createdtime: string;
  modifiedtime: string;
}

interface APIResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: ImageData[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export function useCampImage(url: string, contentId: number) {
  const [images, setImages] = useState<ImageData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CAMPING_API_KEY = process.env.REACT_APP_CAMPING_API_KEY;
        const ImageUrl = `${url}imageList?serviceKey=${CAMPING_API_KEY}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentId}&_type=json`;

        const response: AxiosResponse<APIResponse> = await axios.get(ImageUrl);

        const { items } = response.data.response.body;
        setImages(items.item);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [contentId]);

  return { images };
}
