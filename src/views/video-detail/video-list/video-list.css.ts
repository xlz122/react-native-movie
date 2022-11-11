import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff'
  },
  nav: {
    marginVertical: 7.5,
    marginHorizontal: 15
  },
  navItem: {
    paddingVertical: 2.5,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 11,
    color: '#303133',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: 'hsla(0, 0%, 66.7%, .35)',
    borderRadius: 18
  },
  navActiveItem: {
    backgroundColor: 'rgba(229, 72, 71, .15)',
    borderColor: 'rgba(229, 72, 71, .35)',
    color: '#e54847'
  },
  videoItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    marginHorizontal: 15
  },
  itemCover: {
    position: 'relative'
  },
  coverImage: {
    width: 122,
    height: 70,
    borderRadius: 4
  },
  coverText: {
    position: 'absolute',
    top: 47,
    right: 6,
    zIndex: 2,
    fontSize: 9,
    color: '#fff'
  },
  coverMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: 122,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, .45)'
  },
  coverMaskText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
    marginTop: -8,
    marginLeft: -11.5,
    fontSize: 10,
    color: '#fff'
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10
  },
  infoTitle: {
    fontWeight: '700',
    fontSize: 12.5,
    color: '#303133'
  },
  infoDesc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  descText: {
    fontSize: 10,
    color: '#999'
  },
  noDataText: {
    paddingTop: 45,
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center'
  }
});

export default styles;
