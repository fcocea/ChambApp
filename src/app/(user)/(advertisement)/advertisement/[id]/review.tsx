import { useContext, useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {
  Ellipse,
  G,
  Path,
  SvgProps
} from "react-native-svg";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams } from "expo-router";

import { Avatar, Separator } from "@/components/ui";
import formatMoney from "@/utils/formatMoney";

import { AdvertisementContext } from "../../_layout";

const AdvertisementLocation = (props: SvgProps) => (
  <Svg
    style={{
      width: "100%"
    }}
    height={162}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M393.33-150.573H-2.42v565.966h395.75v-565.966Z" />
      <Path
        fill="#fff"
        d="m272.879 186.384-6.118-3.804 56.963-113.193 4.487-.656 5.845 7.214-9.38 8.132-51.797 102.307Z"
      />
      <G
        stroke="#4D2161"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={0.521}
        opacity={0.5}
      >
        <Path
          strokeDasharray="2.08 2.08"
          d="m131.627-6.294 53.564-6.034 36.571 34.496-6.662 6.951"
          opacity={0.5}
        />
        <Path
          strokeDasharray="2.08 2.08"
          d="m322.909 42.235-10.468-8.919-15.634-6.82-43.504-4.984-32.084.524M296.399-16.395l2.039 81.584M323.181 5.903l-31.813 76.993M286.066 95.356l-90.271 182.709M-1.604 210.91c0-1.442 149.137-126.178 149.137-126.178S98.863 9.707 42.036-22.82L-8.809 5.248M228.424-84.861c-.136-.394-11.692-9.706-11.692-9.706l-28.414 28.986 25.151 24.66-58.051 56.137M356.081 39.219l25.15-11.674 13.867-14.952M326.851 44.99l3.127 3.672-12.1 33.578-94.621 181.791-45.951 90.239 112.702 63.614M81.19 159.232l-82.658 72.533M201.234 111.752v7.082l-33.851 49.186s-26.375-9.968-27.462-11.149c-1.088-1.18-22.024-26.101-22.024-26.101l-14.411 1.049M248 124.343l-42.008-8.263-5.302 22.822"
          opacity={0.5}
        />
        <Path
          strokeDasharray="2.08 2.08"
          d="M150.66 160.544s44.456-36.595 44.048-37.119c-.408-.525-35.619-37.644-35.619-37.644M155.147 97.98l8.701-6.953M85.405 19.938.98 88.536M18.925 73.19l7.613 9.968 8.837-7.083 51.253 59.417M322.093 151.362l-32.084-15.215M335.824 90.634l14.003-11.28-2.039-4.721 12.235-9.969-6.254-5.246 12.78-10.362"
          opacity={0.5}
        />
        <G opacity={0.5}>
          <Path
            d="m284.027 94.307 3.942 1.967M285.114 91.946l3.943 1.968M286.338 89.585l3.943 1.836M287.426 87.224l3.942 1.837M288.513 84.863l3.943 1.836M289.737 82.502l3.942 1.837"
            opacity={0.5}
          />
        </G>
      </G>
      <Path
        fill="#fff"
        stroke="#BBB4B5"
        strokeMiterlimit={10}
        strokeWidth={0.521}
        d="M212.517-40.79c-.815.786-.815 2.098.136 2.885l34.803 31.741 4.895 37.513-9.925 42.89-34.803-35.152 8.293-7.87a2.007 2.007 0 0 0 0-2.885c-.816-.787-2.175-.787-2.991 0l-22.568 21.38L141.28 0c-.816-.787-2.176-.787-2.991-.131-.816.787-.816 2.098-.136 2.885l49.621 50.236-3.806 7.87-38.746 33.315-33.308-38.038c-.136-.13-.136-.262-.272-.524-.136-.131-.271-.262-.543-.394L86.628 27.283c-.408-.394-.952-.656-1.496-.787-.544 0-1.087.13-1.495.524L41.084 62.434c-2.99 2.492-3.398 6.69-.951 9.575l16.314 19.937c2.447 3.017 6.797 3.541 10.06 1.18l43.096-33.446 32.356 37.119-96.66 83.026-11.012-13.248 31.268-25.839c4.759-3.935 5.438-10.755 1.496-15.608L35.647 87.355c-.408-.393-.816-.656-1.36-.787l-19.169-2.23a2.097 2.097 0 0 0-2.311 1.837c-.136 1.18.68 2.098 1.903 2.23l18.353 2.098 9.245 11.018-35.619 30.167c-2.175 1.836-2.447 5.115-.68 7.345l36.57 43.808-44.455 38.169c-.815.787-.951 2.098-.136 2.885a2.29 2.29 0 0 0 1.632.656c.544 0 .951-.131 1.36-.525l75.995-65.318 109.032 38.037-2.991 14.165c-.272 1.05.544 2.23 1.632 2.361h.407c.952 0 1.904-.656 2.04-1.574l15.362-71.615c.272-1.049-.544-2.229-1.631-2.36-1.088-.263-2.312.524-2.448 1.574l-11.555 53.383L80.51 155.56l11.148-9.575c1.631 2.361 5.574 6.82 12.371 6.82h.68c.408 0 .952-.131 1.224-.524l7.477-5.903c.951-.656 1.087-1.967.272-2.885-.68-.918-2.04-1.05-2.991-.263l-6.934 5.509c-5.302-.131-8.157-4.066-8.972-5.377l69.606-59.81 24.335 26.757c2.039 2.229 5.03 3.41 8.021 3.41 2.447 0 4.894-.787 6.934-2.492l9.244-7.739c2.175-1.836 3.535-4.328 3.671-7.083.136-2.754-.816-5.508-2.719-7.476l-25.423-26.888 3.807-8.001 12.507-11.805 36.707 37.12-8.701 37.774c-.272 1.049.408 2.23 1.631 2.492h.408c.952 0 1.903-.656 2.039-1.574l19.713-85.78v-.656l-5.03-38.562c0-.524-.272-.918-.68-1.18l-35.483-32.266c-.68-1.312-2.039-1.18-2.855-.394ZM64.06 90.24c-1.36.919-3.127.657-4.079-.524L43.667 69.78c-.951-1.18-.815-3.016.408-3.934l40.921-34.103 22.024 25.183-42.96 33.316ZM9.136 136.41c-.408-.525-.408-1.181.136-1.705l35.483-30.036 19.305 23.347c2.447 3.016 2.04 7.345-.952 9.837L31.84 163.561 9.136 136.41ZM210.75 91.552c1.223 1.18 1.767 2.886 1.631 4.46-.136 1.705-.951 3.148-2.175 4.328l-9.244 7.739c-2.584 2.23-6.662 1.967-8.973-.656l-24.335-26.757 18.217-15.608 24.879 26.494Z"
      />
      <Path
        fill="#fff"
        stroke="#BBB4B5"
        strokeMiterlimit={10}
        strokeWidth={0.521}
        d="m401.895 172.873-21.616-.524.408-28.594 14.818 5.902c1.088.394 2.312-.131 2.855-1.049.408-1.049-.136-2.23-1.087-2.623l-16.994-6.821c-.272-.131-.408-.131-.68-.131H377.968l-47.447-1.574c-.815 0-1.495.394-1.903 1.05l-15.906 27.937c-.136.263-.272.525-.272.918l-1.767 35.414-9.653.918-42.824-20.986 73.821-150.836 28.142 12.854 16.178 16.788-36.843 28.987c-.952.656-1.088 1.968-.272 2.886.408.524 1.088.787 1.632.787.407 0 .951-.131 1.359-.525l10.604-8.263 25.015 20.199c.408.262.816.525 1.359.525.544 0 1.224-.263 1.632-.787.816-.919.68-2.099-.272-2.886L356.08 82.633l9.109-7.213 27.326 28.199c.407.394.951.656 1.495.656.544 0 1.088-.131 1.495-.524.816-.787.952-2.099.136-2.886l-27.19-27.938 27.462-21.641c.952-.656 1.088-1.968.272-2.886-.68-.918-2.039-1.05-2.991-.262l-13.731 10.755-16.585-17.182c-.136-.131-.408-.394-.68-.394l-28.55-12.985 1.632-3.41c2.719-5.64 1.223-12.33-3.671-16.395l-2.447-2.099 30.997-49.71c.543-.919.271-2.23-.68-2.755-.952-.525-2.311-.262-2.855.656L326.035 3.674 286.61-28.855a3.725 3.725 0 0 0-5.031.394c-1.223 1.443-1.087 3.541.408 4.853l45.136 37.25c2.447 2.099 3.262 5.378 1.767 8.263l-77.355 157.92-1.632 3.41-84.969 173.397-13.73-13.641c-.272-.262-.544-.394-.816-.656l-27.598-14.821c.544-.131.952-.525 1.224-1.05l4.622-8.787c.136-.132.136-.263.136-.394l19.984-77.648c.136-.525 0-1.049-.271-1.574-.272-.525-.816-.787-1.36-.918l-64.304-14.428c-1.088-.262-2.311.393-2.583 1.574-.272 1.049.407 2.23 1.631 2.492l62.265 13.903-19.441 75.419-4.486 8.656c-.272.525-.272.919-.136 1.443l-49.758-26.626L89.346 263.9c1.496-2.623 1.632-5.771.68-8.657-1.087-2.885-3.127-5.115-5.982-6.427l-19.169-8.394c-1.087-.525-2.31 0-2.855 1.049-.543 1.05 0 2.23 1.088 2.755l19.169 8.394a7.301 7.301 0 0 1 3.806 3.935c.68 1.836.544 3.672-.407 5.378l-19.033 35.676-67.84-36.463a3.59 3.59 0 0 0-4.758 1.311c-.951 1.705-.271 3.673 1.36 4.591l151.04 81.058 15.091 14.953.136.131-25.423 51.94c-.816 1.705-.136 3.804 1.631 4.591.544.262.952.394 1.496.394 1.359 0 2.583-.787 3.263-1.968l22.975-46.825 95.845 51.285a3.879 3.879 0 0 0 1.767.393 3.8 3.8 0 0 0 3.127-1.705c.952-1.705.272-3.673-1.359-4.591l-96.253-51.547 65.664-134.179 26.102 12.723-37.386 62.04c-.544.918-.272 2.23.816 2.754.272.131.679.263 1.087.263.68 0 1.496-.394 1.904-1.05l16.857-27.937 26.918 14.952-18.625 32.66c-2.175 3.803-.815 8.525 2.991 10.755l46.767 27.938c1.359.787 2.855 1.18 4.486 1.18.68 0 1.496-.131 2.176-.262 2.175-.525 4.078-2.099 5.166-3.935l19.033-34.102 22.024 12.198c2.175 1.18 3.67 3.148 4.214 5.377.544 2.361.272 4.722-1.088 6.69l-21.344 32.921c-.136.132-.136.263-.272.394l-9.924 27.675c-.408 1.049.272 2.23 1.359 2.623.272.132.408.132.68.132.816 0 1.768-.525 2.039-1.443l9.789-27.413 21.208-32.66c1.903-3.016 2.447-6.427 1.631-9.837-.815-3.41-3.126-6.164-6.253-8.001l-80.347-44.595 13.595-23.872a2.034 2.034 0 0 0-.815-2.754c-1.088-.525-2.311-.131-2.855.787l-13.595 23.74-26.918-14.952 19.576-32.397c.272-.525.408-1.049.136-1.574a2.1 2.1 0 0 0-1.087-1.312l-28.142-13.641 19.849-40.66 43.232 21.117c.272.131.68.262.952.262h.271l12.1-1.18 80.21 2.754h.136c1.088 0 2.04-.918 2.176-1.967 0-1.181-.816-2.099-2.04-2.099l-78.307-2.754 1.632-34.627 15.09-26.364 44.864 1.443-.408 29.249-14.003-.262c-1.088 0-2.175.918-2.175 1.968 0 1.18.951 2.098 2.039 2.098l15.226.394h1.632l22.839.524c1.088 0 2.039-.918 2.175-1.967.136-1.181-.815-2.099-1.903-2.099ZM274.51 296.559l54.516 30.299-19.033 34.233c-.544 1.05-1.495 1.706-2.583 1.968s-2.311.131-3.263-.525l-46.767-27.937c-1.903-1.181-2.583-3.411-1.495-5.378l18.625-32.66ZM14.846-24.395-2.419-13.64c-.952.656-1.224 1.836-.68 2.886.408.655 1.087.918 1.767.918.408 0 .816-.132 1.088-.263l18.897-11.804 16.178-2.624L55.359 7.74c1.768 2.886.816 6.82-2.175 8.657L-.788 48.793c-.952.656-1.36 1.837-.68 2.886.408.656 1.088.918 1.768.918.407 0 .815-.131 1.087-.262L55.36 19.937c5.03-3.016 6.526-9.312 3.535-14.165l-20.12-32.528 24.878-23.74a2.007 2.007 0 0 0 0-2.886l-14.546-14.56c-.816-.786-2.176-.786-2.991 0a2.007 2.007 0 0 0 0 2.886l13.187 13.248-23.52 22.428c-.271 0-.68.131-.951.263a1.61 1.61 0 0 0-.68.655L19.061-26.1-2.284-48.398c-.815-.787-2.175-.918-2.99-.131-.816.787-.952 2.098-.136 2.885l20.256 21.249Z"
      />
      <Path
        fill="#E2E0E1"
        d="m77.361 103.744-8.135 6.356 6.93 8.256L84.291 112l-6.93-8.256ZM97.239 106.066l-7.779 6.757 7.368 7.895 7.779-6.757-7.368-7.895ZM118.456 74.722l-9.8 8.512 5.094 5.459 9.8-8.513-5.094-5.459ZM347.651 99.028l3.943-4.853 28.413 17.445s2.039-4.46 2.583-4.328c.544.131 18.489 9.968 18.489 9.968l-2.855 10.755-50.573-28.987ZM338.407 144.279l-.408 19.281 13.459.787-.68 17.313-32.492-.393-1.087 18.494 80.21 3.541-2.855-20.33-32.764-.787.68-17.707 14.547.525.136-20.068-38.746-.656ZM214.557 105.455l4.078 3.147 8.701-7.869-4.487-3.804-8.292 8.526ZM323.045 86.436l29.909-25.314 4.622 3.935-11.283 9.181 1.903 4.197-14.819 12.33-10.332-4.329Z"
      />
      <Path
        fill="#606161"
        d="M320.088 110.229v-5.653h.807v4.95h3.061v.703h-3.868Zm7.244.064c-.431 0-.832-.072-1.203-.218a2.899 2.899 0 0 1-.953-.605 2.871 2.871 0 0 1-.63-.921 2.862 2.862 0 0 1-.226-1.146c0-.415.075-.797.226-1.147a2.77 2.77 0 0 1 .63-.912c.269-.264.586-.469.953-.614a3.218 3.218 0 0 1 1.203-.218c.43 0 .826.072 1.187.218.366.14.683.342.953.605.274.259.484.563.629.913.151.35.227.735.227 1.155 0 .42-.076.804-.227 1.154-.145.35-.355.657-.629.921-.27.258-.587.46-.953.606a3.278 3.278 0 0 1-1.187.209Zm0-.718c.312 0 .6-.054.864-.162.269-.107.5-.258.694-.452.199-.199.353-.431.46-.694.114-.264.17-.552.17-.864 0-.313-.056-.601-.17-.864a1.996 1.996 0 0 0-.46-.687 1.992 1.992 0 0 0-.694-.46 2.26 2.26 0 0 0-.864-.162 2.34 2.34 0 0 0-.88.162 2.093 2.093 0 0 0-.695.46 2.105 2.105 0 0 0-.468.687 2.253 2.253 0 0 0-.162.864c0 .312.054.6.162.864.113.263.269.495.468.694.199.194.431.345.695.452.269.108.562.162.88.162Zm5.356.654-1.889-5.653h.832l1.736 5.217h-.42l1.8-5.217h.743l1.761 5.217h-.404l1.76-5.217h.767l-1.889 5.653h-.848l-1.647-4.837h.218l-1.656 4.837h-.864Zm8.409-3.214h2.907v.686h-2.907v-.686Zm.073 2.511h3.294v.703h-4.102v-5.653h3.989v.703h-3.181v4.247Zm4.602.703v-5.653h2.204c.496 0 .918.078 1.268.235.35.156.619.382.808.678.188.296.282.649.282 1.058 0 .409-.094.761-.282 1.058a1.82 1.82 0 0 1-.808.67c-.35.156-.772.234-1.268.234h-1.76l.363-.372v2.092h-.807Zm3.779 0-1.437-2.051h.864l1.453 2.051h-.88Zm-2.972-2.011-.363-.395h1.736c.517 0 .907-.111 1.171-.332.269-.226.404-.541.404-.944 0-.404-.135-.716-.404-.937-.264-.221-.654-.331-1.171-.331h-1.736l.363-.404v3.343Zm6.691 2.011-2.487-5.653h.872l2.285 5.217h-.5l2.301-5.217h.807l-2.479 5.653h-.799Zm2.962 0 2.56-5.653h.799l2.568 5.653h-.848l-2.285-5.2h.323l-2.285 5.2h-.832Zm1.09-1.413.218-.646h3.182l.234.646h-3.634Zm5.68 1.413v-5.653h.808v5.653h-.808Zm2.5 0v-5.653h.807v4.95h3.061v.703h-3.868Zm6.387.064c-.431 0-.843-.064-1.236-.193-.393-.135-.702-.307-.928-.517l.298-.63c.216.188.49.345.824.468.334.124.681.186 1.042.186.328 0 .594-.038.799-.113a.958.958 0 0 0 .452-.307.753.753 0 0 0 .146-.452.604.604 0 0 0-.194-.468 1.311 1.311 0 0 0-.493-.283 4.918 4.918 0 0 0-.662-.194 14.639 14.639 0 0 1-.735-.185 3.645 3.645 0 0 1-.67-.283 1.39 1.39 0 0 1-.484-.452c-.124-.194-.186-.442-.186-.743 0-.291.075-.557.226-.8.156-.247.393-.444.71-.589.323-.151.733-.226 1.228-.226.328 0 .654.043.977.129.323.086.603.21.84.371l-.267.646a2.53 2.53 0 0 0-.767-.347 2.911 2.911 0 0 0-.783-.113c-.318 0-.579.041-.783.121a.989.989 0 0 0-.453.323.792.792 0 0 0-.137.452c0 .2.062.358.186.477.129.118.293.213.492.283.205.07.428.134.671.193.242.054.484.116.726.186.248.07.471.162.671.275.204.113.368.263.492.452.124.188.186.43.186.727 0 .285-.078.551-.234.799-.156.242-.399.439-.727.589-.323.146-.732.218-1.227.218Zm3.368-.064v-5.653h2.535c.652 0 1.152.132 1.502.396.35.258.525.614.525 1.066 0 .307-.07.565-.21.775-.135.21-.318.372-.549.485a1.69 1.69 0 0 1-.751.169l.145-.242c.323 0 .609.057.856.17.248.113.444.279.59.5.145.216.218.485.218.808 0 .484-.183.861-.549 1.13-.361.264-.899.396-1.615.396h-2.697Zm.807-.654h1.857c.447 0 .789-.076 1.026-.226.237-.151.355-.388.355-.711 0-.328-.118-.568-.355-.719-.237-.15-.579-.226-1.026-.226h-1.93v-.654h1.729c.409 0 .726-.075.952-.226.226-.151.34-.377.34-.678 0-.302-.114-.528-.34-.678-.226-.151-.543-.227-.952-.227h-1.656v4.345Zm7.646.718c-.743 0-1.327-.212-1.752-.637-.426-.426-.638-1.048-.638-1.866v-3.214h.807v3.182c0 .63.137 1.09.412 1.381.28.29.673.436 1.179.436.511 0 .904-.146 1.179-.436.28-.291.42-.751.42-1.381v-3.182h.783v3.214c0 .818-.213 1.44-.638 1.866-.42.425-1.004.637-1.752.637Zm4.046-.064v-5.653h2.204c.495 0 .918.078 1.268.235.35.156.619.382.807.678.189.296.283.649.283 1.058 0 .409-.094.761-.283 1.058-.188.29-.457.514-.807.67-.35.156-.773.234-1.268.234h-1.76l.363-.372v2.092h-.807Zm3.779 0-1.438-2.051h.864l1.454 2.051h-.88Zm-2.972-2.011-.363-.395h1.736c.517 0 .907-.111 1.171-.332.269-.226.403-.541.403-.944 0-.404-.134-.716-.403-.937-.264-.221-.654-.331-1.171-.331H388.2l.363-.404v3.343Zm7.611 2.075c-.436 0-.837-.07-1.203-.209a2.928 2.928 0 0 1-.953-.606 2.871 2.871 0 0 1-.63-.921 2.897 2.897 0 0 1-.226-1.154c0-.42.076-.805.226-1.155a2.784 2.784 0 0 1 1.591-1.518c.366-.146.77-.218 1.211-.218.447 0 .856.072 1.228.218.371.145.686.363.945.654l-.501.501a2.16 2.16 0 0 0-.759-.493 2.343 2.343 0 0 0-.88-.162c-.323 0-.625.054-.905.162a2.2 2.2 0 0 0-.718.452c-.2.194-.356.425-.469.695a2.272 2.272 0 0 0-.161.864c0 .306.054.594.161.864.113.263.269.495.469.694.204.194.444.345.718.452.275.108.574.162.897.162.301 0 .589-.046.864-.137.28-.097.538-.256.775-.477l.46.614c-.28.237-.608.417-.985.541a3.788 3.788 0 0 1-1.155.177Zm1.365-.823v-2.1h.775v2.205l-.775-.105Z"
      />
      <Path
        fill="#818181"
        d="M239.498 66.27a2.21 2.21 0 0 1-.225.597c-.101.18-.206.316-.316.41l-.329-.273c.1-.095.194-.219.282-.37.089-.152.152-.313.189-.482.048-.218.052-.38.011-.488a.292.292 0 0 0-.227-.2.238.238 0 0 0-.211.048.626.626 0 0 0-.154.213c-.044.09-.087.192-.13.306a6.452 6.452 0 0 1-.146.337c-.055.111-.118.21-.189.298a.666.666 0 0 1-.262.19.684.684 0 0 1-.382.014.67.67 0 0 1-.382-.217.819.819 0 0 1-.188-.427 1.579 1.579 0 0 1 .03-.596 2.22 2.22 0 0 1 .178-.5c.078-.167.167-.298.266-.393l.328.277a1.167 1.167 0 0 0-.243.332c-.057.121-.1.245-.128.372-.046.205-.045.365.001.48.043.115.116.182.221.204a.262.262 0 0 0 .225-.045.747.747 0 0 0 .16-.213 3.64 3.64 0 0 0 .14-.308c.042-.113.091-.226.146-.337.052-.112.113-.21.183-.294a.63.63 0 0 1 .258-.192.62.62 0 0 1 .373-.02.634.634 0 0 1 .376.22.91.91 0 0 1 .184.442c.025.179.012.384-.039.615Zm.575-2.592c-.058.26-.173.447-.345.562-.172.114-.389.144-.65.09l-2.38-.491.104-.469 2.36.488c.141.028.256.017.346-.036a.415.415 0 0 0 .18-.28.561.561 0 0 0-.041-.391l.37-.077c.046.085.073.18.08.287.008.104-.001.21-.024.317Zm-2.517.797-.387-.08.366-1.65.386.08-.365 1.65Zm2.738-1.936-2.595-.536.1-.449.705.146-.186.007a.794.794 0 0 1-.331-.446 1.274 1.274 0 0 1-.004-.654l.456.094a.304.304 0 0 0-.018.057l-.011.05c-.056.25-.025.464.093.641.118.178.319.296.603.355l1.292.266-.104.469Zm.717-3.091a1.582 1.582 0 0 1-.334.697 1.31 1.31 0 0 1-.579.39 1.394 1.394 0 0 1-.723.03 1.401 1.401 0 0 1-.649-.307 1.224 1.224 0 0 1-.362-.56 1.338 1.338 0 0 1-.023-.704c.055-.25.16-.46.313-.63.154-.169.344-.286.57-.352a1.46 1.46 0 0 1 .877.018l-.488 2.201-.338-.07.434-1.957.075.215a.9.9 0 0 0-.468.01.857.857 0 0 0-.579.646.85.85 0 0 0 .017.459.75.75 0 0 0 .242.36.93.93 0 0 0 .427.201l.078.017a.95.95 0 0 0 .491-.022.885.885 0 0 0 .389-.272c.106-.127.18-.284.221-.47.034-.153.039-.296.014-.43a.918.918 0 0 0-.161-.381l.361-.196c.111.145.183.313.216.504a1.55 1.55 0 0 1-.021.603Zm.662-2.99a1.57 1.57 0 0 1-.333.698 1.316 1.316 0 0 1-.579.39 1.394 1.394 0 0 1-.723.03 1.402 1.402 0 0 1-.649-.307 1.216 1.216 0 0 1-.362-.56 1.328 1.328 0 0 1-.023-.704c.055-.25.16-.46.313-.63.154-.169.344-.286.57-.352a1.46 1.46 0 0 1 .877.018l-.488 2.202-.338-.07.434-1.958.075.215a.899.899 0 0 0-.468.01.858.858 0 0 0-.579.646.86.86 0 0 0 .016.459.759.759 0 0 0 .243.36.93.93 0 0 0 .427.201l.078.017a.95.95 0 0 0 .491-.022.882.882 0 0 0 .388-.272c.107-.127.181-.284.222-.47.034-.153.039-.296.014-.43a.907.907 0 0 0-.162-.381l.361-.196c.112.145.184.313.216.504.034.187.027.388-.021.603Zm.605-2.724c-.058.26-.173.447-.345.561-.172.115-.389.145-.65.09l-2.38-.49.104-.469 2.36.487c.141.03.256.017.346-.036a.415.415 0 0 0 .18-.279.561.561 0 0 0-.041-.391l.37-.077c.046.084.073.18.08.287.008.104-.001.21-.024.316Zm-2.517.797-.387-.08.366-1.65.386.08-.365 1.65Zm.716-5.17a1.25 1.25 0 0 1 .245-.53.914.914 0 0 1 .457-.305 1.34 1.34 0 0 1 .662-.006l1.494.308-.104.469-1.44-.297c-.251-.052-.454-.03-.609.068-.154.094-.256.252-.305.473a.93.93 0 0 0 .002.455.687.687 0 0 0 .225.347c.113.092.264.157.453.196l1.337.276-.104.469-2.595-.536.099-.45.701.145-.203.035a.902.902 0 0 1-.31-.472 1.307 1.307 0 0 1-.005-.645Zm3.406-3.006-.548-.113-.109.003-.935-.193c-.199-.041-.366-.014-.499.08-.136.092-.23.253-.281.484a1.37 1.37 0 0 0-.022.465c.017.156.056.294.119.412l-.396.123a1.408 1.408 0 0 1-.139-.529c-.017-.2-.002-.404.043-.609.079-.355.226-.61.441-.766.216-.157.502-.198.858-.125l1.567.324-.099.444Zm-.159.855a1.283 1.283 0 0 1-.21.488.823.823 0 0 1-.343.276.723.723 0 0 1-.423.036.766.766 0 0 1-.36-.177.71.71 0 0 1-.202-.384c-.035-.167-.023-.379.034-.636l.181-.82.338.07-.177.8c-.052.235-.048.4.012.498a.383.383 0 0 0 .257.18.384.384 0 0 0 .342-.087c.098-.085.166-.218.206-.397a.881.881 0 0 0-.016-.483.663.663 0 0 0-.279-.358l.344-.026c.14.093.238.227.295.402.053.175.054.38.001.618Zm-1.452-5.944c.046-.208.127-.383.244-.526a.892.892 0 0 1 .455-.294c.187-.057.407-.06.662-.007l1.493.309-.104.468-1.439-.297c-.252-.052-.454-.032-.607.059-.154.09-.254.242-.301.453a.853.853 0 0 0 .007.43c.04.131.116.242.229.334.113.088.265.151.454.19l1.337.276-.104.469-1.44-.297c-.251-.052-.453-.033-.607.058-.152.088-.252.24-.3.454a.834.834 0 0 0 .008.425c.04.13.116.242.229.333.112.092.264.157.453.196l1.337.276-.104.468-2.596-.535.1-.45.691.143-.193.037a.881.881 0 0 1-.313-.458 1.21 1.21 0 0 1-.011-.62c.055-.247.164-.447.328-.6.16-.155.37-.234.631-.238l-.121.174a.977.977 0 0 1-.389-.509 1.295 1.295 0 0 1-.029-.72Zm3.33-2.527a1.57 1.57 0 0 1-.333.697 1.317 1.317 0 0 1-.579.391 1.394 1.394 0 0 1-.723.03 1.403 1.403 0 0 1-.649-.308 1.216 1.216 0 0 1-.362-.56 1.328 1.328 0 0 1-.023-.704c.055-.25.16-.46.313-.63.154-.168.344-.286.57-.351a1.46 1.46 0 0 1 .877.017l-.488 2.202-.338-.07.434-1.957.075.214a.899.899 0 0 0-.468.01.858.858 0 0 0-.579.646.85.85 0 0 0 .017.459.75.75 0 0 0 .242.361.932.932 0 0 0 .427.2l.078.017a.948.948 0 0 0 .491-.021.877.877 0 0 0 .388-.272c.107-.128.181-.285.222-.47.034-.153.039-.297.014-.431a.917.917 0 0 0-.161-.38l.36-.197c.112.146.184.314.216.504.034.188.027.389-.021.603ZM272.881 181.028a2.226 2.226 0 0 1-.361.527 1.546 1.546 0 0 1-.406.325l-.257-.339a1.64 1.64 0 0 0 .363-.295c.123-.127.222-.268.299-.423.099-.2.141-.357.127-.47a.29.29 0 0 0-.175-.245.237.237 0 0 0-.217-.001.62.62 0 0 0-.201.171 3.473 3.473 0 0 0-.199.266 7.58 7.58 0 0 1-.223.294 1.72 1.72 0 0 1-.255.245.672.672 0 0 1-.302.125.688.688 0 0 1-.376-.074.665.665 0 0 1-.322-.296.81.81 0 0 1-.081-.456c.013-.177.07-.367.171-.571a2.21 2.21 0 0 1 .291-.443c.117-.145.235-.252.354-.321l.255.343a1.15 1.15 0 0 0-.316.267 1.723 1.723 0 0 0-.214.33c-.093.189-.131.344-.113.466.015.12.07.203.167.247.082.038.159.04.231.007a.741.741 0 0 0 .206-.169c.069-.078.139-.167.21-.266.069-.101.143-.199.223-.294.078-.096.161-.177.249-.243a.634.634 0 0 1 .297-.127.624.624 0 0 1 .369.065c.145.067.25.167.315.299.065.133.09.289.075.469a1.73 1.73 0 0 1-.184.587Zm1.176-2.38c-.118.239-.274.394-.47.466-.195.071-.414.051-.656-.06l-2.207-1.016.213-.43 2.189 1.007c.13.06.245.075.346.044a.42.42 0 0 0 .242-.23.556.556 0 0 0 .053-.388l.38.01a.667.667 0 0 1 .009.296c-.017.102-.05.202-.099.301Zm-2.647.201-.359-.165.749-1.515.359.165-.749 1.515Zm3.135-1.254-2.408-1.108.204-.412.654.301-.183-.035a.781.781 0 0 1-.218-.507c-.011-.196.04-.407.152-.634l.423.194a.31.31 0 0 0-.031.052l-.023.045c-.113.23-.134.444-.061.642.073.199.241.359.504.48l1.199.552-.212.43Zm1.433-2.83a1.594 1.594 0 0 1-.491.599c-.201.142-.42.225-.658.247a1.408 1.408 0 0 1-.714-.136 1.38 1.38 0 0 1-.56-.445 1.193 1.193 0 0 1-.221-.624c-.016-.231.032-.46.145-.687.114-.23.265-.41.456-.539.19-.129.403-.199.64-.211a1.468 1.468 0 0 1 .852.216l-1 2.021-.313-.144.888-1.797.023.225a.92.92 0 0 0-.46-.097.868.868 0 0 0-.718.495.84.84 0 0 0-.093.447.739.739 0 0 0 .151.405.905.905 0 0 0 .369.291l.073.033c.16.074.322.105.484.092a.912.912 0 0 0 .444-.176c.134-.099.244-.234.328-.404a1.07 1.07 0 0 0 .116-.415.897.897 0 0 0-.067-.405l.399-.108c.074.166.104.345.091.537a1.539 1.539 0 0 1-.164.58Zm1.357-2.745a1.586 1.586 0 0 1-.491.599c-.201.143-.42.225-.658.248a1.404 1.404 0 0 1-.713-.136 1.383 1.383 0 0 1-.561-.445 1.2 1.2 0 0 1-.221-.624c-.016-.231.033-.46.145-.687.114-.231.266-.41.456-.539.19-.129.403-.199.64-.212a1.479 1.479 0 0 1 .852.217l-1 2.021-.313-.144.889-1.798.022.225a.908.908 0 0 0-.46-.096.861.861 0 0 0-.718.495.84.84 0 0 0-.093.447.739.739 0 0 0 .151.405.922.922 0 0 0 .369.291l.073.033c.16.074.322.105.484.091a.9.9 0 0 0 .444-.175 1.08 1.08 0 0 0 .328-.405c.07-.14.108-.278.116-.414a.897.897 0 0 0-.067-.405l.399-.108c.074.166.104.345.091.537a1.511 1.511 0 0 1-.164.579Zm1.237-2.502c-.118.239-.274.395-.47.466-.195.072-.414.052-.656-.06l-2.207-1.016.213-.43 2.189 1.008c.13.059.245.074.346.043a.418.418 0 0 0 .242-.229.559.559 0 0 0 .053-.389l.379.01a.652.652 0 0 1 .01.296c-.017.102-.05.203-.099.301Zm-2.647.201-.359-.165.749-1.515.359.165-.749 1.515Zm1.927-4.844c.096-.194.218-.347.366-.458a.926.926 0 0 1 .518-.191c.196-.013.412.035.648.144l1.386.638-.213.43-1.335-.615c-.234-.107-.437-.131-.612-.072-.172.056-.309.186-.409.389a.925.925 0 0 0-.107.441c.005.141.05.271.137.388.089.114.221.211.397.292l1.24.571-.213.43-2.407-1.108.204-.412.649.299-.206-.013a.882.882 0 0 1-.19-.527 1.294 1.294 0 0 1 .147-.626Zm4.041-2.138-.509-.234-.107-.022-.867-.399c-.185-.085-.354-.097-.507-.035-.154.057-.284.192-.389.404-.07.14-.113.289-.131.446a1.11 1.11 0 0 0 .017.426l-.415.029a1.356 1.356 0 0 1-.01-.544c.031-.198.093-.392.186-.58.161-.326.366-.54.613-.642.248-.102.537-.078.867.074l1.453.669-.201.408Zm-.359.792a1.287 1.287 0 0 1-.321.425.832.832 0 0 1-.401.189.731.731 0 0 1-.421-.061.76.76 0 0 1-.31-.253.701.701 0 0 1-.106-.417c.006-.17.068-.373.184-.609l.373-.753.313.144-.363.735c-.107.215-.142.377-.106.485a.377.377 0 0 0 .208.234.391.391 0 0 0 .354-.008c.116-.06.214-.173.295-.337a.882.882 0 0 0 .1-.471.657.657 0 0 0-.187-.411l.342.053a.728.728 0 0 1 .192.457c.01.181-.038.38-.146.598Zm-.006-6.086c.094-.191.215-.342.364-.454a.906.906 0 0 1 .513-.182c.196-.012.412.036.648.144l1.385.638-.212.43-1.336-.614c-.233-.108-.435-.135-.606-.081-.172.053-.305.176-.401.371a.836.836 0 0 0-.096.418c.008.135.056.26.144.374.09.111.223.207.399.288l1.24.571-.213.43-1.336-.614c-.233-.108-.435-.135-.606-.082-.17.051-.304.174-.401.371a.815.815 0 0 0-.093.414c.007.136.055.26.144.375.088.114.22.211.396.292l1.24.571-.213.43-2.407-1.108.204-.412.64.294-.197-.008a.869.869 0 0 1-.197-.514 1.199 1.199 0 0 1 .137-.603c.112-.227.266-.396.463-.508.193-.112.417-.141.672-.086l-.159.141a.959.959 0 0 1-.259-.581 1.278 1.278 0 0 1 .143-.705Zm3.852-1.691a1.577 1.577 0 0 1-.491.599c-.201.143-.42.225-.658.248a1.415 1.415 0 0 1-.713-.136 1.383 1.383 0 0 1-.561-.445 1.208 1.208 0 0 1-.221-.624 1.33 1.33 0 0 1 .145-.688c.114-.23.266-.409.456-.538.19-.129.403-.199.64-.212a1.485 1.485 0 0 1 .852.217l-1 2.021-.313-.144.889-1.798.022.225a.908.908 0 0 0-.46-.096.81.81 0 0 0-.416.144.85.85 0 0 0-.302.351.84.84 0 0 0-.093.447.739.739 0 0 0 .151.405.936.936 0 0 0 .369.291l.073.033c.16.074.322.104.484.091a.9.9 0 0 0 .444-.175c.135-.1.244-.234.328-.405.07-.14.108-.278.116-.414a.897.897 0 0 0-.067-.405l.399-.108c.074.166.104.345.091.537a1.511 1.511 0 0 1-.164.579Z"
      />
      <Path
        fill="#1B456D"
        fillRule="evenodd"
        d="M166.329 78.957c5.272-.469 9.401-4.748 9.401-9.957 0-5.523-4.641-10-10.365-10S155 63.477 155 69c0 5.185 4.091 9.449 9.329 9.95V89a1 1 0 1 0 2 0V78.957Z"
        clipRule="evenodd"
      />
      <Ellipse cx={165.365} cy={69} fill="#fff" rx={5.183} ry={5} />
    </G>
  </Svg>
);

export default function AdvertisementReview() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { advertisementData } = useContext(AdvertisementContext);
  const insets = useSafeAreaInsets();
  const taxService = useMemo(() => (advertisementData.info?.price || 0) * 0.02, [advertisementData]);
  const iva = useMemo(() => ((advertisementData.info?.price || 0) + taxService) * 0.19, [advertisementData, taxService]);
  return (
    <View
      className="flex flex-1 w-full h-full bg-background px-6 pt-6 gap-6"
      style={{
        paddingBottom: insets.bottom
      }}
    >
      <View className="rounded-xl overflow-hidden border border-separator">
        <AdvertisementLocation />
      </View>
      <Separator color="#E5E7EB" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-5 pb-8" alwaysBounceVertical={false}>
        <View className="flex gap-3">
          <Text className="text-[#333333] text-lg font-bold">{advertisementData.info?.title}</Text>
          <View className="flex flex-row justify-between">
            <View className="flex flex-1 flex-col justify-between">
              <View className="flex flex-row items-center gap-1">
                <Feather name="calendar" size={18} color="black" />
                <Text className="text-base">{new Date(advertisementData?.info?.start_date || new Date()).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}</Text>
              </View>
              <View className="flex flex-row items-center gap-1">
                <Feather name="clock" size={18} color="black" />
                <Text className="text-base">{new Date(advertisementData?.info?.start_date || new Date()).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}</Text>
              </View>
            </View>

            <View className="flex flex-row gap-1 justify-center">
              <View className="flex flex-col justify-center items-end gap-1">
                <Text className="text-base">
                  {advertisementData.selected?.first_name}
                  {" "}
                  {advertisementData.selected?.last_name}
                </Text>
                <View>
                  <Text className="text-base">
                    {Number(advertisementData.selected?.average_score || 0).toFixed(1)}
                  </Text>
                </View>
              </View>
              <Avatar size={48} name={advertisementData.selected?.first_name + " " + advertisementData.selected?.last_name} />
            </View>
          </View>
        </View>
        <Separator color="#E5E7EB" />
        <View className="flex flex-col gap-2">
          <Text className="font-medium">Precio</Text>
          <View className="flex flex-col pl-1">
            <View className="flex justify-between w-full flex-row">
              <Text className="text-base">Servicio</Text>
              <Text className="text-base font-light">{formatMoney(advertisementData.info?.price || 0)}</Text>
            </View>
            <View className="flex justify-between w-full flex-row">
              <Text className="text-base">Tarifa de servicio</Text>
              <Text className="text-base font-light">{formatMoney(taxService)}</Text>
            </View>
            <View className="flex justify-between w-full flex-row">
              <Text className="text-base">IVA</Text>
              <Text className="text-base font-light">{formatMoney(iva)}</Text>
            </View>
          </View>
          <Separator className="px-8" color="#E5E7EB" />
          <View className="flex justify-between w-full flex-row">
            <Text className="font-medium text-base">Total</Text>
            <Text>
              {formatMoney(iva + taxService + (advertisementData.info?.price || 0))}
            </Text>
          </View>
        </View>
        <Separator color="#E5E7EB" />
        <View className="flex justify-between flex-row items-center">
          <Text className="text-base font-medium">Pago</Text>
          <View className="flex flex-row gap-2 items-center">
            <Feather name="credit-card" size={18} color="black" />
            <Text className="text-base text-[#333333]">...7896</Text>
            <Feather name="chevron-right" size={18} color="#333333" />
          </View>
        </View>
        <Separator color="#E5E7EB" />
        <Text className="text-xs opacity-40 text-[#333333] font-light">
          {/* Disclaimer text */}
          * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Donec nec nunc nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Donec nec nunc nec nunc.
          {" "}
          {id}
        </Text>
        <TouchableOpacity className="w-full py-4 px-3 bg-primary rounded-xl mt-auto mb-4">
          <Text className="text-white text-center text-base font-medium">Confirmar y chatear</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
