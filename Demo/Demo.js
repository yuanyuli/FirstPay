import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  PixelRatio,
  Dimensions,
} from 'react-native';

import Button from 'react-native-animated-button';

let WINDOW_HEIGHT = Dimensions.get('window').height;
let WINDOW_WIDTH = Dimensions.get('window').width;
let PIXEL = 1 / PixelRatio.get();

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      housePrice: 0,
      housePriceOrigin: 0,
      houseArea: 0,
      houseType: 'Commercial',
      propertyType: 'House',
      isFive: false,
      isTwo: false,
      isNew: false,
      isNinety: true,
      isSix: false,
      firstPay: 0,
      contractTax: 0,
      salesTax: 0,
      individualTax: 0,
      landGrant: 0,
      comprehensivePrice: 0,
      agencyFee: 0,
      guaranteeFee: 0,
      totalPay: 0,
      loan: 0
    }
  }

  handleHousePriceTextInput(e) {
    let value = e.nativeEvent.text;
    value = parseInt(value);

    this.setState({
      housePrice: value
    });
  }

  handleHousePriceOriginTextInput(e) {
    let value = e.nativeEvent.text;
    value = parseInt(value);

    this.setState({
      housePriceOrigin: value
    });
  }

  handleHouseAreaTextInput(e) {
    let value = e.nativeEvent.text;
    value = parseInt(value);

    this.setState({
      housePriceOrigin: value
    });
  }

  calculate() {

    let {housePrice, housePriceOrigin, isTwo, isFive, isSix, houseType, propertyType, houseArea} = this.state;

    let firstPay = 0;
    let agencyFee = 0;
    let guaranteeFee = 0;
    let totalPay = 0;
    let loan = 0;
    let contractTax = 0;
    let salesTax = 0;
    let individualTax = 0;
    let landGrant = 0;
    let comprehensivePrice = 0;
    firstPay = (housePrice - housePrice * 0.7 * 0.9).toFixed(2);
    if (this.state.isNew) {
      firstPay = housePrice * 0.3;
    }

    //贷款
    loan = housePrice - firstPay;
    //中介费
    agencyFee = (housePrice * 0.022).toFixed(2);
    //担保费
    guaranteeFee = (housePrice * 0.005).toFixed(2);
    //契税
    contractTax = (this.state.isNinety ? housePrice * 0.9 * 0.015 : housePrice * 0.9 * 0.01).toFixed(2);

    //营业税%个税
    if (houseType == 'Commercial') {
      salesTax = isTwo || isFive ? (this.state.propertyType == 'House' ? 0 : (housePrice - housePriceOrigin) * 0.56 ) : housePrice * 0.9 * 0.056;
      individualTax = isFive ? 0 : (housePrice - housePriceOrigin) * 0.2;
    } else if (houseType == 'Public') {
      salesTax = isTwo || isFive ? 0 : housePrice * 0.056;
      individualTax = isFive ? (housePrice - housePriceOrigin) * 0.2 : 0;
      landGrant = isSix ? 1560 * houseArea : 1290 * houseArea;
    } else if (houseType == 'Affordable') {
      salesTax = isTwo || isFive ? 0 : housePrice * 0.056;
      individualTax = isFive ? (housePrice - housePriceOrigin) * 0.2 : 0;

    } else if (houseType == 'SecAffordable') {
      salesTax = isTwo || isFive ? (this.state.propertyType == 'House' ? 0 : housePrice * 0.56 ) : housePrice * 0.9 * 0.056;
      individualTax = isFive ? 0 : (housePrice - housePriceOrigin) * 0.2;
      landGrant = housePrice * 0.9 * 0.03;
    }


    totalPay = Number(firstPay) + Number(agencyFee) + Number(guaranteeFee) + Number(contractTax) + Number(individualTax) + Number(salesTax) + Number(landGrant);

    this.setState({
      firstPay,
      agencyFee,
      guaranteeFee,
      totalPay,
      loan,
      contractTax,
      salesTax,
      individualTax,
      landGrant
    })
  }

  selectedHouseType(type) {
    this.setState({
      houseType: type
    })
  }

  selectedPropertyType(type) {
    this.setState({
      propertyType: type
    })
  }

  render() {

    let buttonStyle = {width: 80, height: 25, borderWidth: PIXEL, marginRight: 5, marginBottom: 5};

    if (this.state.isFive) {
      buttonStyle = {...buttonStyle, backgroundColor: '#FDC4BE'}
    }

    return (
      <ScrollView style={styles.container}
                  keyboardDismissMode='on-drag'
      >
        <Text style={styles.welcome}>
          首付计算器
        </Text>
        <View style={{width : WINDOW_WIDTH-20,borderWidth:PIXEL,padding:10,margin:10}}>
          <View style={{flexDirection:'row'}}>
            <Text
              style={styles.text}
            >房价:</Text>
            <TextInput
              placeholder="金额"
              keyboardType="numeric"
              style={{width:80,fontSize:16,marginLeft:10,borderWidth:PIXEL}}
              onChange={(e) => {this.handleHousePriceTextInput(e)}}
            />
            <Text style={[styles.text,{marginLeft:5}]}>万元</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:5}}>
            <Text
              style={styles.text}
            >原价:</Text>
            <TextInput
              placeholder="金额"
              keyboardType="numeric"
              style={{width:80,fontSize:16,marginLeft:10,borderWidth:PIXEL}}
              onChange={(e) => {this.handleHousePriceOriginTextInput(e)}}
            />
            <Text style={[styles.text,{marginLeft:5}]}>万元</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:5}}>
            <Text
              style={styles.text}
            >面积:</Text>
            <TextInput
              placeholder="面积"
              keyboardType="numeric"
              style={{width:80,fontSize:16,marginLeft:10,borderWidth:PIXEL}}
              onChange={(e) => {this.handleHouseAreaTextInput(e)}}
            />
            <Text style={[styles.text,{marginLeft:5}]}>平方米</Text>
          </View>
          <View
            style={{marginTop:10,flexDirection:'row',flexWrap:'wrap'}}
          >
            <Button
              style={{...buttonStyle,width:60,backgroundColor:this.renderPropertyBackgroundColor('House')}}
              text="普通住宅"
              activeFontStyle={{}}
              onPress={() => {this.selectedPropertyType('House')}}
            />
            <Button
              style={{...buttonStyle,width:60,backgroundColor:this.renderPropertyBackgroundColor('UnHouse')}}
              text="商住两用"
              activeFontStyle={{}}
              onPress={() => {this.selectedPropertyType('UnHouse')}}
            />
          </View>
          <View
            style={{marginTop:10,flexDirection:'row',flexWrap:'wrap'}}
          >
            <Button
              style={{...buttonStyle,width:60,backgroundColor:this.renderHouseBackgroundColor('Commercial')}}
              text="商品房"
              activeFontStyle={{}}
              onPress={() => {this.selectedHouseType('Commercial')}}
            />
            <Button
              style={{...buttonStyle,width:40,backgroundColor:this.renderHouseBackgroundColor('Public')}}
              text="公房"
              activeFontStyle={{}}
              onPress={() => {this.selectedHouseType('Public')}}
            />
            <Button
              style={{...buttonStyle,backgroundColor:this.renderHouseBackgroundColor('Affordable')}}
              text="经济适用房"
              activeFontStyle={{}}
              onPress={() => {this.selectedHouseType('Affordable')}}
            />
            <Button
              style={{...buttonStyle,width:100,backgroundColor:this.renderHouseBackgroundColor('SecAffordable')}}
              text="二类经济适用房"
              activeFontStyle={{}}
              onPress={() => {this.selectedHouseType('SecAffordable')}}
            />
          </View>
          <View
            style={{marginTop:10,flexDirection:'row',flexWrap:'wrap'}}
          >
            <Button
              style={{...buttonStyle,width:70,backgroundColor:this.renderTaxBackgroundColor(this.state.isFive)}}
              text="满五唯一"
              activeFontStyle={{}}
              onPress={() => {this.setState({isFive:!this.state.isFive})}}
            />
            <Button
              style={{...buttonStyle,width:70,backgroundColor:this.renderTaxBackgroundColor(this.state.isTwo)}}
              text="满二"
              activeFontStyle={{}}
              onPress={() => {this.setState({isTwo:!this.state.isTwo})}}
            />
            <Button
              style={{...buttonStyle,width:40,backgroundColor:this.renderTaxBackgroundColor(this.state.isNew)}}
              text="新房"
              activeFontStyle={{}}
              onPress={() => {this.setState({isNew:!this.state.isNew})}}
            />

            <Button
              style={{...buttonStyle,width:70,backgroundColor:this.renderTaxBackgroundColor(this.state.isNinety)}}
              text=">90平米"
              activeFontStyle={{}}
              onPress={() => {this.setState({isNinety:!this.state.isNinety})}}
            />
            <Button
              style={{...buttonStyle,width:70,backgroundColor:this.renderTaxBackgroundColor(this.state.isSix)}}
              text="城六区"
              activeFontStyle={{}}
              onPress={() => {this.setState({isSix:!this.state.isSix})}}
            />

          </View>
        </View>
        <Button
          style={{alignSelf:'center',width:WINDOW_WIDTH-20,height:50,borderWidth:PIXEL}}
          onPress={() => {this.calculate()}}
          text="开始计算"
        />
        <View style={{width :WINDOW_WIDTH -20,borderWidth:PIXEL,padding:10,margin:10}}>
          <View style={{flexDirection:'row',borderBottomWidth:PIXEL}}>
            <Text style={styles.text}> 首付款 </Text>
            <Text style={styles.text}> {this.state.firstPay} </Text>
          </View>
          <View style={{flexDirection:'row',borderBottomWidth:PIXEL}}>
            <Text style={styles.text}> 契税 </Text>
            <Text style={styles.text}> {this.state.contractTax} </Text>
          </View>
          <View style={{flexDirection:'row',borderBottomWidth:PIXEL}}>
            <Text style={styles.text}> 营业税 </Text>
            <Text style={styles.text}> {this.state.salesTax} </Text>
          </View>
          <View style={{flexDirection:'row',borderBottomWidth:PIXEL}}>
            <Text style={styles.text}> 个税 </Text>
            <Text style={styles.text}> {this.state.individualTax} </Text>
          </View>
          <View style={{flexDirection:'row',borderBottomWidth:PIXEL}}>
            <Text style={styles.text}> 土地出让金 </Text>
            <Text style={styles.text}> {this.state.landGrant} </Text>
          </View>
          <View style={{flexDirection:'row',borderBottomWidth:PIXEL}}>
            <Text style={styles.text}> 综合地价款 </Text>
            <Text style={styles.text}> {this.state.comprehensivePrice} </Text>
          </View>
          <View style={{flexDirection:'row',borderBottomWidth:PIXEL}}>
            <Text style={styles.text}> 中介费 </Text>
            <Text style={styles.text}> {this.state.agencyFee} </Text>
          </View>
          <View style={{flexDirection:'row',borderBottomWidth:PIXEL}}>
            <Text style={styles.text}> 担保费 </Text>
            <Text style={styles.text}> {this.state.guaranteeFee} </Text>
          </View>
        </View>

        <View style={{width :WINDOW_WIDTH -20,borderWidth:PIXEL,padding:10,margin:10}}>
          <View style={{flexDirection:'row',borderBottomWidth:PIXEL}}>
            <Text style={styles.text}> 总首付 </Text>
            <Text style={styles.text}> {this.state.totalPay} </Text>
          </View>
          <View style={{flexDirection:'row',borderBottomWidth:PIXEL}}>
            <Text style={styles.text}> 贷款 </Text>
            <Text style={styles.text}> {this.state.loan} </Text>
          </View>
        </View>


      </ScrollView>
    );
  }

  renderHouseBackgroundColor(type) {
    if (type == this.state.houseType) {
      return '#FDC4BE'
    } else {
      return '#F5FCFF'
    }
  }

  renderPropertyBackgroundColor(type) {
    if (type == this.state.propertyType) {
      return '#FDC4BE'
    } else {
      return '#F5FCFF'
    }
  }

  renderTaxBackgroundColor(bool) {
    if (bool) {
      return '#FDC4BE'
    } else {
      return '#F5FCFF'
    }
  }


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  button: {
    width: 30,
    height: 20,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'red'
  }
});