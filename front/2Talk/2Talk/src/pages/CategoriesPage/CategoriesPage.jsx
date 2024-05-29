import React, { useEffect, useState } from 'react';
import { TalkCard } from '../../components/TalkCard/TalkCard';
import { PageLogo } from '../../components/PageLogo/PageLogo';
import axios, { chatsUrl } from '../../axios';
import { CATEGORIES_ROUTE, ROOMS_ROUTE } from '../../utils/consts'
import { Sidebar } from '../../components/Sidebar/Sidebar';

export const CategoriesPage = () => {

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(chatsUrl);
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="categories_page page">
        <div className="wrapper">
          <div className="page-container">
            <Sidebar />
            <div className="categories_page-wrapper">
              <div className="categories_page-head page-head">
                <span>Categories</span>
              </div>
              <div className="page-list-wrapper">
                <div className="categories_page-list page-list">
                  {
                    categories.map((category, index) => (
                      <TalkCard key={index}
                        path={`${CATEGORIES_ROUTE}/${category.id}${ROOMS_ROUTE}`}
                        name={category.title}
                        id={index + 1}
                        categoryId={category.id}
                        icon={category.avatar}
                      >

                      </TalkCard>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
