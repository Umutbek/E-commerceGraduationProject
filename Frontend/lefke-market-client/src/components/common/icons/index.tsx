import Image from "next/image"
import {COLOR} from "../../../enums";

export const ArrowUpIcon = () => {
    return <>
        <Image src={"/icons/arrow_up.png"} width={16} height={8.8} alt="uygo arrow up"/>
    </>
}

export const ArrowDownIcon = () => {
    return <>
        <Image src={"/icons/arrow_down.png"} width={16} height={8.8} alt="uygo arrow down"/>
    </>
}

export const LikeIcon = ({width = 16, height = 16, color = '#B8B8B8'}) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.3541 1.53085C18.1626 -0.645165 14.2216 0.37031 12.094 2.86064C9.96631 0.37031 6.0253 -0.657254 2.8338 1.53085C1.14135 2.6914 0.077514 4.64981 0.00498003 6.71703C-0.164266 11.4076 3.99435 15.1672 10.3411 20.9337L10.462 21.0425C11.3807 21.8766 12.7951 21.8766 13.7139 21.0304L13.8469 20.9095C20.1936 15.1551 24.3401 11.3955 24.183 6.70494C24.1104 4.64981 23.0466 2.6914 21.3541 1.53085ZM12.2149 19.1324L12.094 19.2533L11.9731 19.1324C6.21872 13.9221 2.42278 10.4767 2.42278 6.98299C2.42278 4.56519 4.23613 2.75184 6.65393 2.75184C8.51563 2.75184 10.329 3.94865 10.9697 5.60484H13.2303C13.859 3.94865 15.6723 2.75184 17.534 2.75184C19.9518 2.75184 21.7652 4.56519 21.7652 6.98299C21.7652 10.4767 17.9692 13.9221 12.2149 19.1324Z" fill={color}/>
        </svg>
    </>
}

export const LikeIconFilled = ({width = 16, height = 16, color = '#B8B8B8'}) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0156 4.89796C16.622 3.26594 13.6662 4.02755 12.0705 5.8953C10.4747 4.02755 7.51897 3.25688 5.12535 4.89796C3.85601 5.76836 3.05814 7.23718 3.00374 8.78759C2.8768 12.3055 5.99576 15.1252 10.7558 19.4501L10.8465 19.5317C11.5355 20.1573 12.5963 20.1573 13.2854 19.5226L13.3852 19.4319C18.1452 15.1162 21.2551 12.2964 21.1372 8.77852C21.0828 7.23718 20.2849 5.76836 19.0156 4.89796Z" fill={color}/>
        </svg>
    </>
}

export const ArrowNextIcon = ({ width = 16, height = 16, color = '#0076CF' }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.590081 11.1196C0.513031 11.0481 0.450809 10.9622 0.406965 10.8668C0.363121 10.7713 0.338515 10.6681 0.334553 10.5631C0.330591 10.4581 0.347351 10.3534 0.383874 10.2548C0.420397 10.1563 0.475968 10.066 0.547415 9.98893L4.30949 5.99966L0.547415 2.01039C0.475977 1.93335 0.420413 1.84299 0.383895 1.74448C0.347377 1.64596 0.330621 1.54122 0.334583 1.43623C0.338545 1.33124 0.363147 1.22806 0.406986 1.13258C0.450824 1.03709 0.51304 0.95118 0.590081 0.879743C0.667121 0.808305 0.757479 0.752741 0.855994 0.716224C0.954508 0.679706 1.05925 0.662949 1.16424 0.666911C1.26923 0.670873 1.37241 0.695476 1.4679 0.739314C1.56338 0.783153 1.64929 0.845368 1.72073 0.922409L5.98733 5.45567C6.12452 5.6036 6.20075 5.7979 6.20075 5.99966C6.20075 6.20142 6.12452 6.39572 5.98733 6.54365L1.72073 11.0769C1.6493 11.154 1.56339 11.2162 1.4679 11.26C1.37242 11.3039 1.26924 11.3285 1.16424 11.3324C1.05925 11.3364 0.954504 11.3196 0.855989 11.2831C0.757473 11.2466 0.667117 11.191 0.590081 11.1196Z" fill={color}/>
        </svg>
    </>
}

export const ArrowPrevIcon = ({ width = 16, height = 16, color = '#0076CF' }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4157 4.32015C16.5312 4.4273 16.6246 4.55616 16.6903 4.69939C16.7561 4.84261 16.793 4.99739 16.799 5.15488C16.8049 5.31237 16.7798 5.46948 16.725 5.61726C16.6702 5.76503 16.5868 5.90056 16.4797 6.01612L10.8365 12L16.4797 17.9839C16.5868 18.0995 16.6702 18.235 16.7249 18.3828C16.7797 18.5306 16.8048 18.6877 16.7989 18.8452C16.793 19.0027 16.7561 19.1574 16.6903 19.3006C16.6245 19.4439 16.5312 19.5727 16.4157 19.6799C16.3001 19.7871 16.1646 19.8704 16.0168 19.9252C15.869 19.98 15.7119 20.0051 15.5544 19.9991C15.3969 19.9932 15.2422 19.9563 15.0989 19.8905C14.9557 19.8248 14.8268 19.7315 14.7197 19.6159L8.31979 12.816C8.114 12.5941 7.99965 12.3027 7.99965 12C7.99965 11.6974 8.114 11.4059 8.31979 11.184L14.7197 4.38414C14.8268 4.26857 14.9557 4.17524 15.0989 4.10947C15.2422 4.0437 15.3969 4.0068 15.5544 4.00085C15.7119 3.99491 15.869 4.02005 16.0168 4.07483C16.1646 4.12962 16.3001 4.21298 16.4157 4.32015Z" fill={color}/>
        </svg>
    </>
}

export const CatalogIcon = ({ width = 24, height = 24, color = 'white' }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="8.47059" height="8.47059" rx="2" fill={color}/>
            <rect x="3" y="12.5294" width="8.47059" height="8.47059" rx="2" fill={color}/>
            <rect x="12.5293" y="3" width="8.47059" height="8.47059" rx="2" fill={color}/>
            <rect x="12.5293" y="12.5294" width="8.47059" height="8.47059" rx="2" fill={color}/>
        </svg>
    </>
}

export const ListIcon = ({ width = 24, height = 24, color: color = '#828282', ...props }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M5.8125 16.25H3.5625C3.41332 16.25 3.27024 16.3093 3.16475 16.4148C3.05926 16.5202 3 16.6633 3 16.8125V19.0625C3 19.2117 3.05926 19.3548 3.16475 19.4602C3.27024 19.5657 3.41332 19.625 3.5625 19.625H5.8125C5.96168 19.625 6.10476 19.5657 6.21025 19.4602C6.31574 19.3548 6.375 19.2117 6.375 19.0625V16.8125C6.375 16.6633 6.31574 16.5202 6.21025 16.4148C6.10476 16.3093 5.96168 16.25 5.8125 16.25ZM5.8125 5H3.5625C3.41332 5 3.27024 5.05926 3.16475 5.16475C3.05926 5.27024 3 5.41332 3 5.5625V7.8125C3 7.96168 3.05926 8.10476 3.16475 8.21025C3.27024 8.31574 3.41332 8.375 3.5625 8.375H5.8125C5.96168 8.375 6.10476 8.31574 6.21025 8.21025C6.31574 8.10476 6.375 7.96168 6.375 7.8125V5.5625C6.375 5.41332 6.31574 5.27024 6.21025 5.16475C6.10476 5.05926 5.96168 5 5.8125 5ZM5.8125 10.625H3.5625C3.41332 10.625 3.27024 10.6843 3.16475 10.7898C3.05926 10.8952 3 11.0383 3 11.1875V13.4375C3 13.5867 3.05926 13.7298 3.16475 13.8352C3.27024 13.9407 3.41332 14 3.5625 14H5.8125C5.96168 14 6.10476 13.9407 6.21025 13.8352C6.31574 13.7298 6.375 13.5867 6.375 13.4375V11.1875C6.375 11.0383 6.31574 10.8952 6.21025 10.7898C6.10476 10.6843 5.96168 10.625 5.8125 10.625ZM20.4375 16.8125H9.1875C9.03832 16.8125 8.89524 16.8718 8.78975 16.9773C8.68426 17.0827 8.625 17.2258 8.625 17.375V18.5C8.625 18.6492 8.68426 18.7923 8.78975 18.8977C8.89524 19.0032 9.03832 19.0625 9.1875 19.0625H20.4375C20.5867 19.0625 20.7298 19.0032 20.8352 18.8977C20.9407 18.7923 21 18.6492 21 18.5V17.375C21 17.2258 20.9407 17.0827 20.8352 16.9773C20.7298 16.8718 20.5867 16.8125 20.4375 16.8125ZM20.4375 5.5625H9.1875C9.03832 5.5625 8.89524 5.62176 8.78975 5.72725C8.68426 5.83274 8.625 5.97582 8.625 6.125V7.25C8.625 7.39918 8.68426 7.54226 8.78975 7.64775C8.89524 7.75324 9.03832 7.8125 9.1875 7.8125H20.4375C20.5867 7.8125 20.7298 7.75324 20.8352 7.64775C20.9407 7.54226 21 7.39918 21 7.25V6.125C21 5.97582 20.9407 5.83274 20.8352 5.72725C20.7298 5.62176 20.5867 5.5625 20.4375 5.5625ZM20.4375 11.1875H9.1875C9.03832 11.1875 8.89524 11.2468 8.78975 11.3523C8.68426 11.4577 8.625 11.6008 8.625 11.75V12.875C8.625 13.0242 8.68426 13.1673 8.78975 13.2727C8.89524 13.3782 9.03832 13.4375 9.1875 13.4375H20.4375C20.5867 13.4375 20.7298 13.3782 20.8352 13.2727C20.9407 13.1673 21 13.0242 21 12.875V11.75C21 11.6008 20.9407 11.4577 20.8352 11.3523C20.7298 11.2468 20.5867 11.1875 20.4375 11.1875Z" fill={color}/>
        </svg>
    </>
}

export const CatalogListIcon = ({ width = 24, height = 24, color = '#0AAD3B', ...props }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M9.33332 4H4.88889C4.39797 4 4 4.39797 4 4.88889V9.33332C4 9.82423 4.39797 10.2222 4.88889 10.2222H9.33332C9.82423 10.2222 10.2222 9.82423 10.2222 9.33332V4.88889C10.2222 4.39797 9.82423 4 9.33332 4Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.33332 13.7778H4.88889C4.39797 13.7778 4 14.1758 4 14.6667V19.1111C4 19.6021 4.39797 20 4.88889 20H9.33332C9.82423 20 10.2222 19.6021 10.2222 19.1111V14.6667C10.2222 14.1758 9.82423 13.7778 9.33332 13.7778Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.1107 4H14.6662C14.1753 4 13.7773 4.39797 13.7773 4.88889V9.33332C13.7773 9.82423 14.1753 10.2222 14.6662 10.2222H19.1107C19.6016 10.2222 19.9995 9.82423 19.9995 9.33332V4.88889C19.9995 4.39797 19.6016 4 19.1107 4Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.1107 13.7778H14.6662C14.1753 13.7778 13.7773 14.1758 13.7773 14.6667V19.1111C13.7773 19.6021 14.1753 20 14.6662 20H19.1107C19.6016 20 19.9995 19.6021 19.9995 19.1111V14.6667C19.9995 14.1758 19.6016 13.7778 19.1107 13.7778Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </>
}

export const StarIcon = ({ width = 16, height = 16, color = '#F2C94C' }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.00065 11.5133L12.1207 13.9999L11.0273 9.31325L14.6673 6.15992L9.87398 5.75325L8.00065 1.33325L6.12732 5.75325L1.33398 6.15992L4.97398 9.31325L3.88065 13.9999L8.00065 11.5133Z" fill={color}/>
        </svg>
    </>
}

export const CrossIcon = ({ width = 24, height = 24, color = '#828282', onClick = () => {} }) => {
    return <>
        <svg width={width} height={width} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.6446 11.999L18.6572 6.99813C18.8767 6.77862 19 6.48091 19 6.17048C19 5.86005 18.8767 5.56233 18.6572 5.34282C18.4377 5.12332 18.14 5 17.8295 5C17.5191 5 17.2214 5.12332 17.0019 5.34282L12.001 10.3554L7.00012 5.34282C6.78061 5.12332 6.48289 5 6.17247 5C5.86204 5 5.56432 5.12332 5.34481 5.34282C5.12531 5.56233 5.00199 5.86005 5.00199 6.17048C5.00199 6.48091 5.12531 6.77862 5.34481 6.99813L10.3573 11.999L5.34481 16.9999C5.23555 17.1083 5.14883 17.2372 5.08965 17.3792C5.03047 17.5213 5 17.6736 5 17.8275C5 17.9814 5.03047 18.1338 5.08965 18.2758C5.14883 18.4179 5.23555 18.5468 5.34481 18.6552C5.45318 18.7644 5.58211 18.8512 5.72416 18.9103C5.86621 18.9695 6.01858 19 6.17247 19C6.32635 19 6.47872 18.9695 6.62077 18.9103C6.76282 18.8512 6.89175 18.7644 7.00012 18.6552L12.001 13.6427L17.0019 18.6552C17.1102 18.7644 17.2392 18.8512 17.3812 18.9103C17.5233 18.9695 17.6756 19 17.8295 19C17.9834 19 18.1358 18.9695 18.2778 18.9103C18.4199 18.8512 18.5488 18.7644 18.6572 18.6552C18.7664 18.5468 18.8532 18.4179 18.9123 18.2758C18.9715 18.1338 19.002 17.9814 19.002 17.8275C19.002 17.6736 18.9715 17.5213 18.9123 17.3792C18.8532 17.2372 18.7664 17.1083 18.6572 16.9999L13.6446 11.999Z" fill={color}/>
        </svg>
    </>
}

export const FavoriteIcon = ({ width = 24, height = 24, color = '#000' }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.3541 6.53061C22.1626 4.35459 18.2216 5.37007 16.094 7.8604C13.9663 5.37007 10.0253 4.3425 6.8338 6.53061C5.14135 7.69115 4.07751 9.64957 4.00498 11.7168C3.83573 16.4073 7.99435 20.167 14.3411 25.9334L14.462 26.0422C15.3807 26.8764 16.7951 26.8764 17.7139 26.0301L17.8469 25.9093C24.1936 20.1549 28.3401 16.3952 28.183 11.7047C28.1104 9.64957 27.0466 7.69115 25.3541 6.53061ZM16.2149 24.1322L16.094 24.2531L15.9731 24.1322C10.2187 18.9218 6.42278 15.4765 6.42278 11.9827C6.42278 9.56494 8.23613 7.7516 10.6539 7.7516C12.5156 7.7516 14.329 8.94841 14.9697 10.6046H17.2303C17.859 8.94841 19.6723 7.7516 21.534 7.7516C23.9518 7.7516 25.7652 9.56494 25.7652 11.9827C25.7652 15.4765 21.9692 18.9218 16.2149 24.1322Z" fill={color}/>
        </svg>
    </>
}

export const CartIcon = ({ width = 24, height = 24, color = '#000' }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 L 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.7276 26.9084C13.3301 26.9084 13.8185 26.42 13.8185 25.8175C13.8185 25.215 13.3301 24.7266 12.7276 24.7266C12.1251 24.7266 11.6367 25.215 11.6367 25.8175C11.6367 26.42 12.1251 26.9084 12.7276 26.9084Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24.7276 26.9084C25.3301 26.9084 25.8185 26.42 25.8185 25.8175C25.8185 25.215 25.3301 24.7266 24.7276 24.7266C24.1251 24.7266 23.6367 25.215 23.6367 25.8175C23.6367 26.42 24.1251 26.9084 24.7276 26.9084Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 4H8.36364L11.2873 18.6073C11.387 19.1095 11.6603 19.5607 12.0591 19.8818C12.458 20.2029 12.9571 20.3734 13.4691 20.3636H24.0727C24.5847 20.3734 25.0838 20.2029 25.4827 19.8818C25.8816 19.5607 26.1548 19.1095 26.2545 18.6073L28 9.45455H9.45455" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </>
}

export const SettingsIcon = ({ width = 24, height = 24, color = '#000' }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.0163 3C16.995 3.01067 17.9696 3.124 18.9256 3.33733C19.129 3.38273 19.3131 3.49054 19.4523 3.64568C19.5914 3.80082 19.6786 3.99556 19.7016 4.20267L19.9283 6.23867C19.9603 6.52571 20.0592 6.80124 20.2171 7.04307C20.375 7.28491 20.5875 7.48631 20.8375 7.63105C21.0874 7.7758 21.3678 7.85986 21.6562 7.87647C21.9445 7.89307 22.2327 7.84176 22.4976 7.72667L24.3656 6.90667C24.5553 6.82313 24.7662 6.80059 24.9692 6.84215C25.1723 6.88371 25.3574 6.98733 25.499 7.13867C26.8482 8.58012 27.853 10.3088 28.4376 12.1947C28.4989 12.3928 28.4971 12.6052 28.4323 12.8023C28.3676 12.9994 28.2432 13.1714 28.0763 13.2947L26.4203 14.516C26.1874 14.6871 25.9981 14.9105 25.8675 15.1683C25.737 15.4261 25.669 15.711 25.669 16C25.669 16.289 25.737 16.5739 25.8675 16.8317C25.9981 17.0895 26.1874 17.3129 26.4203 17.484L28.0776 18.704C28.245 18.8271 28.3699 18.9994 28.4349 19.1967C28.4999 19.3941 28.5018 19.6068 28.4403 19.8053C27.8554 21.6911 26.8507 23.4197 25.5016 24.8613C25.3604 25.0123 25.1758 25.1159 24.9734 25.1576C24.7709 25.1994 24.5604 25.1774 24.371 25.0947L22.495 24.272C22.2304 24.156 21.9423 24.1039 21.6539 24.12C21.3654 24.136 21.0849 24.2197 20.8348 24.3644C20.5848 24.509 20.3723 24.7105 20.2146 24.9525C20.0569 25.1945 19.9583 25.4702 19.927 25.7573L19.7016 27.792C19.6789 27.9969 19.5934 28.1897 19.4569 28.3441C19.3204 28.4985 19.1395 28.607 18.939 28.6547C17.0077 29.1141 14.9956 29.1141 13.0643 28.6547C12.8638 28.607 12.6829 28.4985 12.5463 28.3441C12.4098 28.1897 12.3243 27.9969 12.3016 27.792L12.0776 25.76C12.045 25.4736 11.9455 25.1988 11.7874 24.9578C11.6292 24.7168 11.4167 24.5162 11.1669 24.3723C10.9172 24.2283 10.6371 24.145 10.3493 24.129C10.0614 24.1129 9.77383 24.1647 9.50962 24.28L7.63495 25.1013C7.44533 25.1844 7.23459 25.2066 7.03183 25.1648C6.82907 25.123 6.64428 25.0193 6.50295 24.868C5.15323 23.4248 4.14847 21.6943 3.56429 19.8067C3.50282 19.6082 3.50471 19.3954 3.5697 19.1981C3.6347 19.0007 3.75957 18.8285 3.92695 18.7053L5.58429 17.484C5.81742 17.3131 6.007 17.0897 6.13769 16.8319C6.26837 16.574 6.33647 16.2891 6.33647 16C6.33647 15.7109 6.26837 15.426 6.13769 15.1681C6.007 14.9103 5.81742 14.6869 5.58429 14.516L3.92695 13.2973C3.7598 13.174 3.6352 13.0017 3.57045 12.8044C3.5057 12.607 3.50401 12.3944 3.56562 12.196C4.15032 10.3102 5.15507 8.58148 6.50429 7.14C6.64587 6.98866 6.83097 6.88505 7.034 6.84348C7.23703 6.80192 7.44796 6.82447 7.63762 6.908L9.50429 7.728C9.76965 7.84303 10.0583 7.89422 10.347 7.87745C10.6357 7.86068 10.9165 7.77643 11.1668 7.63146C11.417 7.48649 11.6298 7.28484 11.788 7.04272C11.9462 6.8006 12.0454 6.52475 12.0776 6.23733L12.3043 4.20267C12.3272 3.99514 12.4144 3.79998 12.5538 3.64455C12.6932 3.48913 12.8778 3.38123 13.0816 3.336C14.0376 3.124 15.015 3.012 16.0163 3ZM16.0163 5C15.4115 5.0071 14.808 5.05925 14.211 5.156L14.0656 6.45867C13.9991 7.05808 13.7925 7.63346 13.4627 8.13838C13.1329 8.64331 12.689 9.06363 12.1668 9.36545C11.6447 9.66727 11.0589 9.84213 10.4567 9.87592C9.8546 9.90972 9.25293 9.8015 8.70029 9.56L7.50295 9.03467C6.74028 9.96016 6.13324 11.0036 5.70562 12.124L6.76962 12.9067C7.25524 13.2636 7.65008 13.7297 7.92221 14.2674C8.19435 14.8051 8.33615 15.3993 8.33615 16.002C8.33615 16.6047 8.19435 17.1989 7.92221 17.7366C7.65008 18.2743 7.25524 18.7404 6.76962 19.0973L5.70429 19.8813C6.13095 21.004 6.73895 22.0493 7.50162 22.9773L8.70829 22.448C9.25961 22.2073 9.85974 22.0994 10.4604 22.133C11.061 22.1665 11.6454 22.3407 12.1664 22.6414C12.6875 22.942 13.1307 23.3608 13.4603 23.8641C13.7899 24.3673 13.9968 24.9409 14.0643 25.5387L14.211 26.8507C15.3963 27.0507 16.6083 27.0507 17.7936 26.8507L17.9403 25.5387C18.0067 24.9401 18.2128 24.3656 18.5422 23.8614C18.8715 23.3572 19.3148 22.9375 19.8362 22.6362C20.3576 22.3348 20.9426 22.1603 21.5438 22.1267C22.1451 22.0931 22.7459 22.2013 23.2976 22.4427L24.5043 22.9707C25.2666 22.0446 25.8731 21.0008 26.3003 19.88L25.2363 19.096C24.7507 18.7391 24.3558 18.273 24.0837 17.7352C23.8116 17.1975 23.6698 16.6033 23.6698 16.0007C23.6698 15.398 23.8116 14.8038 24.0837 14.2661C24.3558 13.7284 24.7507 13.2622 25.2363 12.9053L26.2976 12.1227C25.87 11.0022 25.263 9.95883 24.5003 9.03333L23.3056 9.55733C22.7533 9.79913 22.1518 9.90766 21.5498 9.87415C20.9478 9.84065 20.3621 9.66604 19.84 9.36445C19.3179 9.06285 18.8741 8.6427 18.5443 8.13794C18.2145 7.63317 18.0081 7.05793 17.9416 6.45867L17.795 5.15733C17.2072 5.06124 16.6131 5.0091 16.0176 5.00133L16.0163 5ZM16.0003 11C17.3264 11 18.5981 11.5268 19.5358 12.4645C20.4735 13.4021 21.0003 14.6739 21.0003 16C21.0003 17.3261 20.4735 18.5979 19.5358 19.5355C18.5981 20.4732 17.3264 21 16.0003 21C14.6742 21 13.4024 20.4732 12.4648 19.5355C11.5271 18.5979 11.0003 17.3261 11.0003 16C11.0003 14.6739 11.5271 13.4021 12.4648 12.4645C13.4024 11.5268 14.6742 11 16.0003 11ZM16.0003 13C15.2046 13 14.4416 13.3161 13.879 13.8787C13.3164 14.4413 13.0003 15.2043 13.0003 16C13.0003 16.7956 13.3164 17.5587 13.879 18.1213C14.4416 18.6839 15.2046 19 16.0003 19C16.7959 19 17.559 18.6839 18.1216 18.1213C18.6842 17.5587 19.0003 16.7956 19.0003 16C19.0003 15.2043 18.6842 14.4413 18.1216 13.8787C17.559 13.3161 16.7959 13 16.0003 13Z" fill={color}/>
        </svg>
    </>
}

export const LogoutIcon = ({ width = 24, height = 24, color = '#000' }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2841 20.5706L6.85742 15.9992L11.2841 11.4277" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.85742 16H20.5717" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.4287 5.33301L23.6192 5.33606C25.3015 5.33758 26.6668 6.70139 26.6668 8.38367V23.6141C26.6668 25.298 25.3015 26.6618 23.6192 26.6618L11.4287 26.6663" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </>
}

export const HomeIcon = ({ width = 24, height = 24, color = COLOR.GRAY }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.4608 10.699C21.4603 10.6986 21.4599 10.6981 21.4594 10.6977L13.301 2.53955C12.9532 2.19165 12.4909 2 11.9991 2C11.5073 2 11.045 2.1915 10.6971 2.5394L2.54293 10.6934C2.54018 10.6961 2.53744 10.699 2.53469 10.7018C1.82058 11.42 1.8218 12.5853 2.5382 13.3017C2.8655 13.6292 3.29778 13.8188 3.75997 13.8387C3.77874 13.8405 3.79766 13.8414 3.81673 13.8414H4.1419V19.8453C4.1419 21.0334 5.10854 22 6.2969 22H9.48873C9.81221 22 10.0747 21.7377 10.0747 21.4141V16.707C10.0747 16.1649 10.5156 15.7239 11.0578 15.7239H12.9404C13.4826 15.7239 13.9235 16.1649 13.9235 16.707V21.4141C13.9235 21.7377 14.1858 22 14.5095 22H17.7013C18.8897 22 19.8563 21.0334 19.8563 19.8453V13.8414H20.1578C20.6495 13.8414 21.1118 13.6499 21.4599 13.302C22.177 12.5844 22.1773 11.4171 21.4608 10.699Z" fill={color}/>
        </svg>
    </>
}

export const StoreIcon = ({ width = 24, height = 24, color = COLOR.GRAY }) => {
    return <>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9993 16.2013H5.39866V10.7007V9.60063H3.19845V10.7007V19.5016C3.19845 20.1101 3.69006 20.6017 4.29855 20.6017H13.0994C13.7079 20.6017 14.1995 20.1101 14.1995 19.5016V10.7007V9.5H12L11.9993 10.7007V16.2013ZM22.8147 7.88859L19.8822 3.48817C19.6759 3.1822 19.3322 3 18.9643 3H5.03425C4.6664 3 4.32262 3.1822 4.11979 3.48817L1.18732 7.88859C0.699149 8.62085 1.2217 9.60063 2.10178 9.60063H21.9002C22.7769 9.60063 23.2994 8.62085 22.8147 7.88859ZM18.5999 20.0516C18.5999 20.3541 18.8474 20.6017 19.15 20.6017H20.2501C20.5526 20.6017 20.8001 20.3541 20.8001 20.0516V10.7007V9.5H18.5999V10.7007V20.0516Z" fill={color}/>
        </svg>
    </>
}

export const BasketIcon = ({ width = 24, height = 24, color = COLOR.GRAY }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2.8572C2 2.62986 2.09031 2.41183 2.25107 2.25107C2.41183 2.09031 2.62986 2 2.8572 2H3.49496C4.58075 2 5.23223 2.73034 5.60368 3.40924C5.8517 3.86184 6.03114 4.38645 6.17172 4.86191C6.20974 4.85891 6.24787 4.85739 6.28601 4.85734H20.5704C21.5191 4.85734 22.2048 5.76483 21.9443 6.67804L19.855 14.0031C19.6676 14.6601 19.2713 15.2382 18.7261 15.6499C18.1808 16.0615 17.5162 16.2843 16.833 16.2844H10.0348C9.34622 16.2845 8.67664 16.0583 8.12903 15.6408C7.58141 15.2233 7.18608 14.6375 7.00378 13.9734L6.13515 10.8052L4.69504 5.94999L4.6939 5.94085C4.5156 5.2928 4.34874 4.6859 4.09958 4.2333C3.8607 3.79327 3.66869 3.71441 3.4961 3.71441H2.8572C2.62986 3.71441 2.41183 3.62409 2.25107 3.46334C2.09031 3.30258 2 3.08455 2 2.8572Z" fill={color}/>
            <path d="M9.42845 22.0014C10.0347 22.0014 10.6161 21.7606 11.0448 21.3319C11.4735 20.9032 11.7143 20.3218 11.7143 19.7156C11.7143 19.1093 11.4735 18.5279 11.0448 18.0992C10.6161 17.6705 10.0347 17.4297 9.42845 17.4297C8.8222 17.4297 8.24078 17.6705 7.81209 18.0992C7.38341 18.5279 7.14258 19.1093 7.14258 19.7156C7.14258 20.3218 7.38341 20.9032 7.81209 21.3319C8.24078 21.7606 8.8222 22.0014 9.42845 22.0014Z" fill={color}/>
            <path d="M17.4304 22.0014C18.0367 22.0014 18.6181 21.7606 19.0468 21.3319C19.4754 20.9032 19.7163 20.3218 19.7163 19.7156C19.7163 19.1093 19.4754 18.5279 19.0468 18.0992C18.6181 17.6705 18.0367 17.4297 17.4304 17.4297C16.8242 17.4297 16.2427 17.6705 15.814 18.0992C15.3854 18.5279 15.1445 19.1093 15.1445 19.7156C15.1445 20.3218 15.3854 20.9032 15.814 21.3319C16.2427 21.7606 16.8242 22.0014 17.4304 22.0014Z" fill={color}/>
        </svg>
    </>
}

export const ProfileIcon = ({ width = 24, height = 24, color = COLOR.GRAY }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.025 13.6875C14.016 13.6875 13.5309 14.25 11.875 14.25C10.2191 14.25 9.7375 13.6875 8.725 13.6875C6.11641 13.6875 4 15.8039 4 18.4125V19.3125C4 20.2441 4.75586 21 5.6875 21H18.0625C18.9941 21 19.75 20.2441 19.75 19.3125V18.4125C19.75 15.8039 17.6336 13.6875 15.025 13.6875ZM11.875 13.125C14.6699 13.125 16.9375 10.8574 16.9375 8.0625C16.9375 5.26758 14.6699 3 11.875 3C9.08008 3 6.8125 5.26758 6.8125 8.0625C6.8125 10.8574 9.08008 13.125 11.875 13.125Z" fill={color}/>
        </svg>
    </>
}


export const RemoveIcon = ({ width = 24, height = 24, color = COLOR.GRAY }) => {
    return <>
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V9C18 7.9 17.1 7 16 7H8C6.9 7 6 7.9 6 9V19ZM9 9H15C15.55 9 16 9.45 16 10V18C16 18.55 15.55 19 15 19H9C8.45 19 8 18.55 8 18V10C8 9.45 8.45 9 9 9ZM15.5 4L14.79 3.29C14.61 3.11 14.35 3 14.09 3H9.91C9.65 3 9.39 3.11 9.21 3.29L8.5 4H6C5.45 4 5 4.45 5 5C5 5.55 5.45 6 6 6H18C18.55 6 19 5.55 19 5C19 4.45 18.55 4 18 4H15.5Z" fill={color}/>
        </svg>
    </>
}
