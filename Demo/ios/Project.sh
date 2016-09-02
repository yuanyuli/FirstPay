#!/bin/bash

project="Demo.xcodeproj"
target="Demo"
SDK="iphoneos"
CONFIGURATION="Release"
CODE_SIGN_IDENTITY="iPhone Developer: 264724217@qq.com (VM3H4782J4)"
PROVISIONING_PROFILE="3e451462-45ef-404b-bf08-d8825a97ba91"
configurationBuildDir="/Users/zhangtian/Desktop/首付计算器/Demo/ios/build"

xcodebuild -project ${project} -target ${target} -sdk ${SDK} -configuration ${CONFIGURATION} build CODE_SIGN_IDENTITY="${CODE_SIGN_IDENTITY}" PROVISIONING_PROFILE=${PROVISIONING_PROFILE} 

signApp="${configurationBuildDir}/${CONFIGURATION}-iphoneos/${target}.app"
output="${configurationBuildDir}/${target}.ipa"
xcrun -sdk ${SDK} -v PackageApplication ${signApp} -o ${output}
