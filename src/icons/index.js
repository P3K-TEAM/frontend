import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faAngleDown,
	faAngleRight,
	faBars,
	faChevronLeft,
	faFile,
	faFilePdf,
	faProjectDiagram,
	faTrash,
	faEye,
	faTimes,
	faCloudUploadAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
	faFacebookSquare,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';

library.add(
	faAngleDown,
	faAngleRight,
	faBars,
	faProjectDiagram,
	faFile,
	faFilePdf,
	faChevronLeft,
	faTrash,
	faEye,
	faEnvelope,
	faFacebookSquare,
	faInstagram,
	faTimes,
	faCloudUploadAlt
);

Vue.component('fa-icon', FontAwesomeIcon);
