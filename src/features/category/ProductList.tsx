import React, {FC} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Colors} from '@utils/Constants';
import ProductItem from './ProductItem';

interface productListProps {
  data: any;
}

const ProductList: FC<productListProps> = ({data}) => {
  const renderItem = ({item, index}: any) => {
    return <ProductItem item={item} index={index} />;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      style={styles.container}
      contentContainerStyle={styles.content}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.backgroundSecondary,
  },
  content: {
    paddingVertical: 10,
    paddingBottom: 100,
  },
});

export default ProductList;
