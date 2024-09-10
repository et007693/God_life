import React from 'react'

const GalleryImgList = ({data}) => {
    const allItems = data.flatMap(page => page);
    console.log(allItems);
    const groupedByDate = allItems.reduce((groups, item) => {

        const date = item.date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      }, {});

      // 날짜별로 정렬된 배열을 생성합니다
      const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));

        // 정렬된 날짜에 따라 이미지를 렌더링합니다
        return sortedDates.flatMap(date => [
          <div key={`date-${date}`} className="col-span-3 text-left font-bold mt-4 mb-2 ">
            {date}
          </div>,
          ...groupedByDate[date].map(item => (
            <div key={item.id}>
              <img src={item.src} alt={item.id} />
            </div>
          ))
        ]);
}

export default GalleryImgList