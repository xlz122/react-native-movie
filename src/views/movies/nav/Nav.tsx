import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { categoriesData } from '../../../api/movies';
import type { ResponseType } from '../../../types/index';
import type { MovieParams } from '../../../api/movies';
import NavGroup from '../nav-group/NavGroup';

type Category = {
  categories: {
    name: string;
    children: {
      name: never;
    }[];
  }[];
  genres: { name: string }[];
  countries: unknown[];
  years: unknown[];
};

function Nav(props): React.ReactElement {
  const [category, setCategory] = useState<Category>({
    categories: [],
    genres: [],
    countries: [],
    years: []
  });

  const getCategoriesData = () => {
    categoriesData()
      .then((res: ResponseType<Category>) => {
        if (res.code === 200) {
          res.data?.countries.unshift({ name: '全部' });
          res.data?.years.unshift({ name: '全部' });

          setCategory({
            categories: res.data?.categories || [],
            genres: [],
            countries: res.data?.countries || [],
            years: res.data?.years || []
          });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  // 初始化第二分类
  useEffect(() => {
    if (!category?.categories) {
      return;
    }

    const genres: Category['genres'] = handlerGroup('全部');

    setCategory({ ...category, genres });
  }, [category?.categories]);

  const [categoryParams, setCategoryParams] = useState<Partial<MovieParams>>({
    category: '全部',
    genre: '全部',
    country: '全部',
    year: '全部'
  });

  const categoriesChange = (name: string) => {
    const genres: Category['genres'] = handlerGroup(name);

    setCategory({ ...category, genres });

    setCategoryParams({ ...categoryParams, category: name });
  };

  const genresChange = (name: string) => {
    setCategoryParams({ ...categoryParams, genre: name });
  };

  const countriesChange = (name: string) => {
    setCategoryParams({ ...categoryParams, country: name });
  };

  const yearsChange = (name: string) => {
    setCategoryParams({ ...categoryParams, year: name });
  };

  function handlerGroup(name: string): Category['genres'] {
    const genres: Category['genres'] = [];

    genres.unshift({ name: '全部' });

    category?.categories?.forEach(item => {
      if (name === '全部') {
        item?.children.forEach(i => {
          if (!genres.includes(i.name)) {
            genres.push({ name: i.name });
          }
        });

        return false;
      }

      if (name === item.name) {
        item?.children.forEach(i => {
          genres.push({ name: i.name });
        });
      }
    });

    return genres;
  }

  useEffect(() => {
    props.onChange(categoryParams);
  }, [categoryParams]);

  return (
    <View style={styles.nav}>
      <NavGroup
        category={category.categories}
        active={categoryParams.category}
        onChange={categoriesChange}
      />
      <NavGroup
        category={category.genres}
        active={categoryParams.genre}
        onChange={genresChange}
      />
      <NavGroup
        category={category.countries}
        active={categoryParams.country}
        onChange={countriesChange}
      />
      <NavGroup
        category={category.years}
        active={categoryParams.year}
        onChange={yearsChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    paddingTop: 10,
    backgroundColor: '#fff'
  }
});

export default Nav;
