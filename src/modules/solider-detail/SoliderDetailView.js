import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ActivityIndicator,
    SafeAreaView,
    ScrollView
} from 'react-native';
import {SearchBar} from 'react-native-elements'
import {fonts, colors} from '../../styles';
import {Text} from '../../components/StyledText';
import PropTypes from 'prop-types'
import {scale} from "../../styles/index";
import _ from 'lodash'
import {debounce} from 'lodash'
import {getParams} from "../../services/navigation-service";
import {dateTimeHelper} from "../../helpers";


export default class SoliderDetailView extends Component {
  static propTypes = {
    getSolidDataDetail: PropTypes.func,
  }

  constructor(props) {
    super(props);
  this.params = getParams(props)
    this.state = {
      data: null,
        loading: true,
    };
  }

  componentDidMount(){
      if(_.isEmpty(this.params)){
          return
      }
      const {_id} = this.params
    this.props.getSolidDataDetail(_id).then(response => {
      this.setState(({
        data: response.data,
          loading: false,
      }))
    })
  }

    renderItem = () => {
        const  {data} = this.state
        if(_.isEmpty(data)){
            return
        }

        const {name, phone , birthday,birthplace,father_note,mother_note,note, girl_friend_note,girl_friend_phone_number,girl_friend_zalo,
            girl_friend_facebook,girl_friend_birthday,facebook_link,zalo_link  ,address ,_id,
            company_key, religion_name , academic_level_name, group_name, rank_name , position_name} = data
        return (
            <View style={styles.wrapContainer}>
                <View style={styles.wrapItem}>
                    <View style={styles.wrapItemContent}>
                        <Text style={[styles.txtTitle]}>Tên</Text>
                        <Text style={[styles.txtTitle]}>{name}</Text>
                    </View>
                </View>
                <View style={styles.wrapItem}>
                    <View style={styles.wrapItemContent}>
                        <Text style={[styles.txtTitle]}>Số điện thoại</Text>
                        <Text style={[styles.txtTitle]}>{phone}</Text>
                    </View>
                </View>
                <View style={styles.wrapItem}>
                    <View style={styles.wrapItemContent}>
                        <Text style={[styles.txtTitle]}>Ngày sinh</Text>
                        <Text style={[styles.txtTitle]}>{dateTimeHelper.convertToDate(birthday, 'DD/MM/YYYY')}</Text>
                    </View>
                </View>
            <View style={styles.wrapItem}>
                <View style={styles.wrapItemContent}>
                    <Text style={[styles.txtTitle]}>Nơi sinh</Text>
                    <Text style={[styles.txtTitle]}>{birthplace}</Text>
                </View>
            </View>
            <View style={styles.wrapItem}>
                <View style={styles.wrapItemContent}>
                    <Text style={[styles.txtTitle]}>Thông tin thêm về cha</Text>
                    <Text style={[styles.txtTitle]}>{father_note}</Text>
                </View>

            </View>
            <View style={styles.wrapItem}>
                <View style={styles.wrapItemContent}>
                    <Text style={[styles.txtTitle]}>Thông tin thêm về mẹ</Text>
                    <Text style={[styles.txtTitle]}>{mother_note}</Text>
                </View>
            </View>
            <View style={styles.wrapItem}>
                <View style={styles.wrapItemContent}>
                    <Text style={[styles.txtTitle]}>Địa chỉ đang ở</Text>
                    <Text style={[styles.txtTitle]}>{address}</Text>
                </View>
            </View>
            <View style={styles.wrapItem}>
                <View style={styles.wrapItemContent}>
                    <Text style={[styles.txtTitle]}>Đại đội</Text>
                    <Text style={[styles.txtTitle]}>{company_key}</Text>
                </View>
            </View>

            <View style={styles.wrapItem}>
                <View style={styles.wrapItemContent}>
                    <Text style={[styles.txtTitle]}>Tôn giáo</Text>
                    <Text style={[styles.txtTitle]}>{religion_name}</Text>
                </View>
            </View>

            <View style={styles.wrapItem}>
                <View style={styles.wrapItemContent}>
                    <Text style={[styles.txtTitle]}>Trình độ văn hóa</Text>
                    <Text style={[styles.txtTitle]}>{academic_level_name}</Text>
                </View>
            </View>
            <View style={styles.wrapItem}>
                <View style={styles.wrapItemContent}>
                    <Text style={[styles.txtTitle]}>Đảng/Đoàn</Text>
                    <Text style={[styles.txtTitle]}>{group_name}</Text>
                </View>
            </View>
            <View style={styles.wrapItem}>
                <View style={styles.wrapItemContent}>
                    <Text style={[styles.txtTitle]}>Cấp bậc</Text>
                    <Text style={[styles.txtTitle]}>{rank_name}</Text>
                </View>
            </View>
            <View style={styles.wrapItem}>
                <View style={styles.wrapItemContent}>
                    <Text style={[styles.txtTitle]}>Chức vụ</Text>
                    <Text style={[styles.txtTitle]}>{position_name}</Text>
                </View>
            </View>

            </View>
        )
    }

  render() {
    const {data , loading} = this.state
    return (
        <ScrollView
            contentContainerStyle={styles.container}>
            {this.renderItem()}
            {loading && (
                <ActivityIndicator animating size="large" />
            )}
        </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      marginHorizontal: scale(20),
      marginVertical: scale(20),

  },
    wrapContainer: {
        marginBottom: scale(30)
    },
  txtTitle: {
    fontFamily: fonts.primaryLight,
    fontWeight: 'bold',
    fontSize: scale(15),
    color: '#757575',
    textAlign: 'left',
      borderColor: '#757575',
      borderWidth: scale(1),
      paddingHorizontal: scale(10),
      paddingVertical: scale(10),
      width: '50%'

  },
  wrapItem: {
      flex: 1,
  },
    wrapItemContent: {
        flex: 1,
        flexDirection: 'row',
    }

});
