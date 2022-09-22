import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {},
  movieInfo: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12
  },
  infoImage: {
    width: 94,
    height: 132,
    borderRadius: 3
  },
  infoDesc: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
  },
  descTitle: {
    marginTop: 1,
    marginBottom: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '700'
  },
  descBrief: {
    marginTop: 7
  },
  descText: {
    marginTop: 4,
    fontSize: 11,
    color: '#fff'
  },
  operate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 17
  },
  operateItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    width: 104,
    height: 26,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: 5
  },
  operateIcon: {
    marginRight: 3.5,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#fff'
  },
  operateText: {
    fontSize: 11,
    color: '#fff'
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 6,
    marginLeft: 12,
    marginRight: 12,
    minHeight: 82,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: 6
  },
  ratingItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingCover: {
    position: 'relative'
  },
  ratingLine: {
    position: 'absolute',
    top: -5,
    right: -62,
    width: 0.5,
    height: 71,
    backgroundColor: 'hsla(0,0%,100%,.2)'
  },
  ratingText: {
    fontSize: 11,
    color: '#fff'
  },
  ratingIcon: {
    position: 'absolute',
    top: -3,
    right: -14,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#fff'
  },
  ratingScore: {
    marginTop: 3,
    marginBottom: 3,
    fontWeight: '700',
    fontSize: 18,
    color: '#feb300'
  },
  noRating: {
    fontSize: 12,
    color: '#fff'
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
    marginLeft: 12,
    marginRight: 12
  },
  tagItem: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 8,
    marginBottom: 9,
    backgroundColor: 'hsla(0, 0%, 100%, .1)',
    fontSize: 12,
    color: '#fff',
    borderRadius: 18
  },
  summary: {
    color: '#f5f5f5'
  }
});

export default styles;
