// src/components/ExhibitionGrid.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExhibitionGrid() {
  // 設定狀態
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const itemsPerPage = 10;

  // 計算分頁資訊
  const totalItems = filteredData.length;
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  useEffect(() => {
    // 載入資料
    axios
      .get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
      .then((response) => {
        const data = response.data.map((item, index) => ({
          id: index + 1,
          title: item.title || '無資訊',
          location: item.showInfo?.[0]?.location || '無資訊',
          price: item.showInfo?.[0]?.price || '免費',
        }));
        setAllData(data);
        setFilteredData(data); // 預設顯示所有資料
      })
      .catch((error) => console.error('API 錯誤:', error));
  }, []);

  // 處理搜尋
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const filtered = allData.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // 搜尋後回到第一頁
  };

  // 更新表格資料
  const updateTable = () => {
    return filteredData.slice(startIndex, endIndex).map((item) => (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.location}</td>
        <td>{item.price}</td>
      </tr>
    ));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>景點觀光展覽資訊</h1>

      {/* 搜尋欄 */}
      <div className="search-container" style={{ margin: '20px 0', textAlign: 'center' }}>
        <input
          type="text"
          id="searchInput"
          value={search}
          onChange={handleSearchChange}
          placeholder="搜尋展覽名稱"
          style={{
            padding: '8px',
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
      </div>

      {/* 展覽資料表格 */}
      <table
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          borderCollapse: 'collapse',
          width: '100%',
          margin: '20px 0',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                paddingTop: '12px',
                paddingBottom: '12px',
                textAlign: 'left',
                backgroundColor: '#04AA6D',
                color: 'white',
                border: '1px solid #ddd',
              }}
            >
              名稱
            </th>
            <th
              style={{
                paddingTop: '12px',
                paddingBottom: '12px',
                textAlign: 'left',
                backgroundColor: '#04AA6D',
                color: 'white',
                border: '1px solid #ddd',
              }}
            >
              地點
            </th>
            <th
              style={{
                paddingTop: '12px',
                paddingBottom: '12px',
                textAlign: 'left',
                backgroundColor: '#04AA6D',
                color: 'white',
                border: '1px solid #ddd',
              }}
            >
              票價
            </th>
          </tr>
        </thead>
        <tbody>{updateTable()}</tbody>
      </table>

      {/* 分頁 */}
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage <= 1}
          style={{
            padding: '8px 16px',
            margin: '0 10px',
            backgroundColor: '#04AA6D',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          上一頁
        </button>
        <span
          id="pageInfo"
          style={{
            margin: '0 15px',
            fontWeight: 'bold',
          }}
        >
          第 {currentPage} 頁 / 共 {totalPages} 頁
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage >= totalPages}
          style={{
            padding: '8px 16px',
            margin: '0 10px',
            backgroundColor: '#04AA6D',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          下一頁
        </button>
      </div>
    </div>
  );
}

export default ExhibitionGrid;
