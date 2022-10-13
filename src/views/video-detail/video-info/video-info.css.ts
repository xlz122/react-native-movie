import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff'
  },
  authorWarp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9'
  },
  author: {
    display: 'flex',
    flexDirection: 'row'
  },
  authorAvatar: {
    width: 31,
    height: 31,
    borderRadius: 18
  },
  authorInfo: {
    marginLeft: 9
  },
  authorName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#777'
  },
  authorCount: {
    marginTop: 1,
    fontSize: 9,
    color: '#999'
  },
  reportBtn: {
    fontSize: 11.5,
    color: '#999'
  },
  title: {
    paddingHorizontal: 15,
    marginVertical: 12,
    fontSize: 14.5,
    fontWeight: '700',
    color: '#303133'
  },
  otherWarp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  otherText: {
    paddingHorizontal: 15,
    fontSize: 10.5,
    color: '#999'
  },
  movie: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  movieImage: {
    width: 37,
    height: 53,
    borderRadius: 2
  },
  movieInfo: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10
  },
  infoTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5
  },
  titleText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#444'
  },
  titleRating: {
    marginLeft: 5,
    fontSize: 9.5,
    fontWeight: '700',
    color: '#f16c00'
  },
  infoDesc: {
    fontSize: 10.5,
    color: '#555'
  }
});

export default styles;
