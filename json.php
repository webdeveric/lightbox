<?php

$data = [
    'content' => '<div class="column">
    <img src="http://photos-b.ak.instagram.com/hphotos-ak-xaf1/10632372_1494431157490505_1660545440_n.jpg" class="img-fill" />
</div>'
];

header('Content-Type: application/json');
echo json_encode( $data );
