import { StyleSheet } from 'react-native';
import { viewHeight } from '@/utils/screen';

const styles = StyleSheet.create({
  page: {
    height: viewHeight - 60,
    backgroundColor: '#fff'
  },
  summary: {
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  summaryContent: {
    paddingBottom: 10
  },
  summaryTitle: {
    paddingVertical: 12
  },
  summaryTitleText: {
    fontWeight: '700',
    color: '#303133'
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 8
  },
  itemLabel: {
    minWidth: 50,
    fontSize: 13.5,
    color: '#666'
  },
  itemValue: {
    fontSize: 13.8,
    color: '#333'
  },
  descText: {
    fontSize: 13,
    color: '#444'
  },
  close: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff'
  },
  closeView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    backgroundColor: '#e5e5e5',
    borderRadius: 50
  },
  closeIcon: {
    fontFamily: 'iconfont',
    fontSize: 17,
    color: '#fff'
  }
});

export default styles;
