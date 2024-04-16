/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import Modal from '.';
import Gallery from '~/View/Gallery';

const childrenMapping = {};

export default {
    title: 'View/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
            mapping: childrenMapping,
            description: 'modal body',
        },
        onCloseModal: {
            action: 'onCloseModal',
            description: 'close modal callback',
        },
        title: {
            control: 'text',
            description: 'modal title',
        },
    },
    parameters: {
        docs: {
            story: {
                inline: false,
                height: 500,
            },
        },
    },
};

export const Images = (
    <Modal title="Gallery">
        <Gallery>
            <img src="https://picsum.photos/id/25/5000/3333" alt="Test 1" key={1} />
            <img src="https://picsum.photos/id/16/2500/1667" alt="Test 2" key={2} />
            <img src="https://picsum.photos/id/14/2500/1667" alt="Test 3" key={3} />
            <img src="https://picsum.photos/id/29/4000/2670" alt="Test 4" key={4} />
        </Gallery>
    </Modal>
);
childrenMapping.Images = Images.props.children;
Images.args = {
    ...Images.props,
    children: 'Images',
};

export const Text = (
    <Modal title="Text">
        <div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin rhoncus massa at convallis.
                Nunc auctor nisl nulla, finibus ultricies nisl malesuada eu. Aenean sagittis ipsum nulla, ut vulputate
                arcu maximus ac. Cras enim enim, rutrum eu varius ut, lobortis at risus. Maecenas vitae velit a tortor
                ullamcorper finibus. Sed mollis, mauris vel ornare suscipit, ligula nisl laoreet enim, quis dignissim
                magna mi vitae sapien. Nulla non mauris tellus. Vivamus id dolor ac odio aliquet placerat et sit amet
                tortor. Donec euismod velit non orci congue, sed hendrerit tellus tempor. Integer dapibus dui at felis
                vulputate, vitae semper nibh ultricies. Proin ac lacus metus. Ut pharetra quis metus quis tempor.
            </p>
            <p>
                Integer fermentum placerat lorem sit amet ultricies. Donec non odio iaculis dolor consequat mattis. Nunc
                congue, metus sed volutpat tempor, ipsum dolor ornare elit, ut feugiat velit nisl eget dui. Nam
                ultricies vulputate ultricies. Phasellus rutrum neque id commodo pharetra. Donec id pulvinar lacus.
                Donec maximus molestie sem, et porttitor odio vehicula id. Curabitur vel orci in tortor suscipit
                laoreet. Phasellus commodo sapien neque, mattis tincidunt orci sagittis vitae. Cras at eros in nisi
                rhoncus congue. Aenean nibh nulla, suscipit vitae semper non, blandit ut magna. Vestibulum suscipit diam
                nulla, vel fringilla nisi egestas quis. Mauris ultrices convallis purus sit amet commodo. Aliquam eget
                suscipit velit. Cras vel neque porttitor, laoreet turpis eu, tincidunt risus.
            </p>
            <p>
                Nulla vel lectus sed nisi lobortis faucibus a nec massa. Aenean at tellus non lacus efficitur
                scelerisque in eu ligula. Donec lacinia neque nec convallis porttitor. Fusce elit neque, fringilla quis
                luctus eget, faucibus sit amet erat. Vestibulum condimentum fermentum varius. Nulla consequat, est a
                semper malesuada, metus mi lobortis diam, sit amet scelerisque velit diam feugiat eros. Aliquam egestas
                tortor vitae purus vestibulum sollicitudin. Integer vitae nunc felis.
            </p>
            <p>
                Etiam tristique eleifend magna eget egestas. Vestibulum feugiat sem eu nisl cursus hendrerit. Integer
                facilisis purus sed hendrerit efficitur. Mauris commodo sem vel maximus hendrerit. Vestibulum suscipit
                sem ac erat fermentum sollicitudin. Nunc tristique aliquam turpis et maximus. In condimentum metus
                felis, eu lobortis orci eleifend non. Nulla ex tellus, luctus nec mattis at, tincidunt id ex. Donec
                lobortis eleifend cursus. Morbi dictum dolor neque, eget tristique purus ultrices a.
            </p>
            <p>
                Sed non mollis neque. Integer metus sapien, fermentum non dui id, eleifend semper lectus. Phasellus
                auctor odio sed ex varius scelerisque. Nulla congue, est vel viverra commodo, nisi erat vehicula tellus,
                ut ultricies odio quam fringilla orci. Praesent sed dui vitae nisi ornare sagittis non et erat.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc
                posuere ipsum id justo ullamcorper, vitae commodo nibh finibus. Vestibulum posuere, tortor quis placerat
                auctor, dui velit sodales leo, vel ultrices justo ligula ut est. Nunc nisl sem, hendrerit at tincidunt
                non, dignissim ut nunc. Vestibulum sed suscipit justo, porttitor dignissim augue. Proin tempor tristique
                mauris sit amet porttitor. Vestibulum condimentum metus ac leo dapibus, eget gravida elit porttitor. Sed
                arcu diam, auctor at dolor a, lacinia consequat odio. Phasellus sit amet metus eget dui fringilla
                feugiat. Nullam porta odio non varius ultrices. Nullam eu dui nulla.
            </p>
        </div>
    </Modal>
);
childrenMapping.Text = Text.props.children;
Text.args = {
    ...Text.props,
    children: 'Text',
};

export const Empty = <Modal title="Empty" />;
childrenMapping.Empty = Empty.props.children;
Empty.args = {
    ...Empty.props,
    children: 'Empty',
};
