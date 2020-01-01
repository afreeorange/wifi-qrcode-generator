(() => {
  const IMAGE_SIZE_IN_PIXELS = 1024;
  const $ = document.querySelector.bind(document);

  const qrcode = new QRCode($(".qrcode"), {
    text: "http://jindo.dev.naver.com/collie",
    width: IMAGE_SIZE_IN_PIXELS,
    height: IMAGE_SIZE_IN_PIXELS,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
    useSVG: true,
  });

  const generateWifiString = (networkName, networkPassword) =>
    `WIFI:T:WPA;S:${networkName};P:${networkPassword};;`;

  // Values 'stick' for some reason
  $('.color-foreground').value = "#000000";
  $('.color-background').value = "#FFFFFF";

  $(".name").addEventListener("keyup", e => {
    qrcode.makeCode(generateWifiString(e.target.value, $(".password").value));
  });

  $(".password").addEventListener("keyup", e => {
    qrcode.makeCode(generateWifiString($(".name").value, e.target.value));
  });

  $(".color-foreground").addEventListener("change", e => {
    qrcode._htOption.colorDark = "#" + e.target.value;
    qrcode.makeCode(generateWifiString($(".name").value, $(".password").value));
  });

  $(".color-background").addEventListener("change", e => {
    qrcode._htOption.colorLight = "#" + e.target.value;
    qrcode.makeCode(generateWifiString($(".name").value, $(".password").value));
  });

  $(".download").addEventListener("click", () => {
    download(
      $(".qrcode").getElementsByTagName("img")[0].src,
      $(".name").value + ".png",
      "image/png",
    );
  });
})();
