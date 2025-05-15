import React, { useState } from 'react';
import './KacKalori.css';
import { besinVerileri } from './besinVerileri';

const KacKalori = () => {
  const [aramaMetni, setAramaMetni] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  
  // Arama işlevi
  const filtrelenmisVeriler = besinVerileri.map(kategori => {
    const filtrelenmisBesinler = kategori.besinler.filter(besin =>
      besin.ad.toLowerCase().includes(aramaMetni.toLowerCase())
    );
    
    return {
      ...kategori,
      besinler: filtrelenmisBesinler
    };
  });
  
  // Kategori genişletme/daraltma işlevi
  const toggleCategory = (kategoriId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [kategoriId]: !prev[kategoriId]
    }));
  };
  
  // Her kategori için gösterilecek besin sayısını belirle
  const getVisibleItems = (items, kategoriId) => {
    const isExpanded = expandedCategories[kategoriId];
    // Genişletilmişse tüm öğeleri, değilse sadece ilk 9 öğeyi göster (3 satır x 3 sütun)
    return isExpanded ? items : items.slice(0, 9);
  };

  return (
    <div className="kac-kalori-container">
      <header className="header">
        <h1>Kaç Kalori?</h1>
        <div className="arama-kutusu">
          <input
            type="text"
            placeholder="Besin adı ara..."
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
          />
          <button className="arama-butonu">Ara</button>
        </div>
      </header>
      
      <div className="kategoriler">
        {filtrelenmisVeriler.map((kategori, index) => {
          const kategoriId = `kategori-${index}`;
          const visibleItems = getVisibleItems(kategori.besinler, kategoriId);
          const hasMoreItems = kategori.besinler.length > 9;
          
          return (
            <div key={index} className="kategori">
              <h2 className="kategori-baslik">{kategori.kategoriAdi}</h2>
              
              {kategori.besinler.length > 0 ? (
                <>
                  <div className="besinler-listesi-container">
                    <div className="besinler-listesi">
                      {visibleItems.map((besin, besinIndex) => (
                        <div key={besinIndex} className="besin-karti">
                          <div className="besin-resim">
                            <img src={besin.resimUrl || 'https://via.placeholder.com/90'} alt={besin.ad} />
                          </div>
                          <div className="besin-bilgi">
                            <h3 className="besin-adi">{besin.ad}</h3>
                            <p className="besin-porsiyon">{besin.porsiyon}</p>
                            <p className="besin-kalori">{besin.kalori} kalori</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {hasMoreItems && (
                    <button 
                      className="daha-fazla-btn"
                      onClick={() => toggleCategory(kategoriId)}
                    >
                      {expandedCategories[kategoriId] ? 'Daha Az Göster' : 'Daha Fazla Göster'}
                    </button>
                  )}
                </>
              ) : (
                <p className="sonuc-yok">Bu kategoride eşleşen besin bulunamadı.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KacKalori;
