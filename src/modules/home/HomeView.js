import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ActivityIndicator,
    SafeAreaView,
    Platform
} from 'react-native';
import {SearchBar} from 'react-native-elements'
import {fonts, colors} from '../../styles';
import {Text} from '../../components/StyledText';
import PropTypes from 'prop-types'
import {scale} from "../../styles/index";
import _ from 'lodash'
import {debounce} from 'lodash'
import NavigationServices from "../../services/navigation-service";
import {ROUTE_SOLIDER_DETAIL_NAME} from "../navigation/stackNavigationData"
import {dateTimeHelper} from "../../helpers"

const isIOS = Platform.OS === 'ios'

export default class HomeScreen extends Component {
  static propTypes = {
    getSolidData: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      search:''
    };
  }

  componentDidMount(){
    this.props.getSolidData().then(response => {
      this.setState(({
        loading: false,
        data: response.data,
      }))
    })
  }

  onPressSolider = (_id) => {
    NavigationServices.navigate(ROUTE_SOLIDER_DETAIL_NAME, {_id})
  }

  renderItem = ({ item, index }) => {
    const {name, phone , birthday  ,address ,_id} = item
    return (
      <TouchableOpacity onPress={() => this.onPressSolider(_id)} style={{flex: 1, flexDirection: 'row'}}>
        <Text style={[styles.lblSttContent]}>{index + 1}</Text>
        <Text style={[styles.txtDes]}>{name}</Text>
        <Text style={styles.txtDes}>{phone}</Text>
        <Text style={styles.txtDes}>{dateTimeHelper.convertToDate(birthday, 'DD/MM/YYYY')}</Text>
        <Text style={styles.txtDes}>{address}</Text>
      </TouchableOpacity>
    )
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          borderColor:'#CED0CE',
          borderRadius: scale(30),
          borderWidth: scale(1),
          flex: 1,
          marginHorizontal: scale(15),
          marginVertical: scale(5)
        }}
      />
    )
  }

  renderHeader = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row', marginTop: scale(10)}}>
          <Text style={[styles.lblStt]}>Stt</Text>
          <Text style={[styles.txtTitle]}>Tên</Text>
          <Text style={[styles.txtTitle]}>Số điện thoại</Text>
          <Text style={styles.txtTitle}>Ngày sinh</Text>
          <Text style={styles.txtTitle}>Nơi sinh</Text>
        </View>
        <View
          style={{
            borderColor:'gray',
            borderRadius: scale(30),
            borderWidth: scale(1),
            width: '90%',
            marginVertical: scale(10)
          }}
        />
      </View>
    )
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: scale(20),
          borderTopWidth: scale(1),
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  updateSearch = (searchText) => {
      this.setState({search: searchText})
      this.search(searchText)
  }

  search = debounce ((searchText) => {
      searchText = _.isEmpty(searchText) ? '' : searchText
      this.props.getSolidData(searchText).then(response => {
          this.setState(({
              loading: false,
              data: response.data,
          }))
      })
  }, 100)

  render() {
    const {data, search} = this.state
    return (
        <View style={styles.container}>
          <SearchBar
              containerStyle={{width: '100%', backgroundColor: '#CED0CE', fontFamily: fonts.primaryLight}}
              inputContainerStyle={{backgroundColor: 'white', height: scale(40) }}
              placeholder="Tìm kiếm..."
              round
              onChangeText={this.updateSearch}
              value={search}
          />
          <FlatList
              contentContainerStyle={{flexGrow: 1}}
              data={data}
              renderItem={this.renderItem}
              keyExtractor={item => item.Country}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
          />
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
      marginTop: isIOS ? scale(25) : null,
  },
  txtTitle: {
    fontFamily: fonts.primaryLight,
    fontWeight: 'bold',
    fontSize: scale(15),
    color: '#757575',
    width: '20%',
    textAlign: 'left',
    paddingLeft: scale(18),

  },
  lblStt: {
      fontFamily: fonts.primaryLight,
      fontWeight: 'bold',
      fontSize: scale(15),
      color: '#757575',
      width: '15%',
      textAlign: 'left',
      paddingLeft: scale(12),
  },
  txtDes: {
    fontFamily: fonts.primaryLight,
    fontWeight: 'bold',
    fontSize: scale(14),
    color: '#000000',
    width: '20%',
    textAlign: 'left',
    paddingLeft: scale(18),
  },
    lblSttContent: {
        fontFamily: fonts.primaryLight,
        fontWeight: 'bold',
        fontSize: scale(14),
        color: '#000000',
        width: '15%',
        textAlign: 'left',
        paddingLeft: scale(18),
    }
});
