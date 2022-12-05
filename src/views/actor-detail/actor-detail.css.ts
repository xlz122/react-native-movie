import { StyleSheet, Platform } from 'react-native';
import { viewHeight } from '@/utils/screen';

const styles = StyleSheet.create({
  page: {
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#f5f5f5'
  },
  count: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 72,
    paddingVertical: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  countItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  countItemValue: {
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  countItemLabel: {
    fontSize: 12,
    color: '#888'
  },
  countLastItem: {
    borderRightWidth: 0
  },
  award: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 72,
    paddingHorizontal: 10,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  awardImage: {
    width: 44,
    height: 44,
    borderRadius: 50
  },
  awardTitle: {
    flex: 1,
    paddingLeft: 9.5,
    fontWeight: '700',
    fontSize: 15,
    color: '#303133'
  },
  awardCount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  awardCountText: {
    fontSize: 12.5,
    color: '#999'
  },
  awardCountIcon: {
    marginTop: 1.5,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#999'
  },
  placeholder: {
    height: 1
  },
  summary: {
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#303133'
  },
  noSummary: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: '#303133'
  },
  noSummaryText: {
    height: 75,
    lineHeight: 75,
    fontSize: 12,
    color: '#999'
  }
});

export default styles;
