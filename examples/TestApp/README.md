## iOS error
 _**Build input file double-conversion cannot be found**_

 Third party libraries are not installed. Run the following commands to fix:
```
 cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../

 cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
```
